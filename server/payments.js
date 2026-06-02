import { nanoid } from "nanoid";
import { z } from "zod";
import {
  createPayment,
  getPaymentByProviderReference,
  getPaymentById,
  markUserPremium,
  updatePaymentStatus,
  upsertUser
} from "./db.js";

const MERCADOPAGO_PREFERENCES_URL =
  "https://api.mercadopago.com/checkout/preferences";
const MERCADOPAGO_PAYMENTS_URL = "https://api.mercadopago.com/v1/payments";

const PRODUCT = {
  name: "Plan Premium Vocatia",
  amount: 4990,
  currency: "PEN"
};

export const preferenceSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(120),
  phone: z.string().min(6).max(30).optional().or(z.literal("")),
  resultSummary: z
    .object({
      mainProfile: z.string().optional(),
      compatibility: z.number().optional()
    })
    .optional()
});

function getAccessToken() {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("MERCADOPAGO_ACCESS_TOKEN no esta configurada en el backend.");
  }

  return accessToken;
}

function getFrontendUrl() {
  return process.env.WEB_ORIGIN || "http://127.0.0.1:5173";
}

function mapMercadoPagoStatus(status) {
  if (status === "approved") return "paid";
  if (["rejected", "cancelled", "refunded"].includes(status)) return "failed";

  return "pending";
}

export async function createPaymentPreference(payload) {
  const accessToken = getAccessToken();
  const parsed = preferenceSchema.parse(payload);
  const paymentId = nanoid();
  const now = new Date().toISOString();
  const frontendUrl = getFrontendUrl();
  const user = upsertUser({
    id: nanoid(),
    name: parsed.name,
    email: parsed.email,
    phone: parsed.phone || null,
    premium_status: "inactive",
    created_at: now
  });

  createPayment({
    id: paymentId,
    user_id: user.id,
    email: parsed.email,
    usuario_nombre: parsed.name,
    usuario_email: parsed.email,
    usuario_telefono: parsed.phone || null,
    producto: PRODUCT.name,
    monto: PRODUCT.amount,
    moneda: PRODUCT.currency,
    estado_pago: "pending",
    proveedor_pago: "mercadopago",
    id_transaccion: null,
    transaction_id: null,
    provider_reference: null,
    error_message: null,
    fecha: now
  });

  try {
    const preferenceResponse = await fetch(MERCADOPAGO_PREFERENCES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: [
          {
            id: "vocatia-premium",
            title: PRODUCT.name,
            quantity: 1,
            currency_id: PRODUCT.currency,
            unit_price: PRODUCT.amount / 100
          }
        ],
        payer: {
          name: parsed.name,
          email: parsed.email,
          phone: parsed.phone ? { number: parsed.phone } : undefined
        },
        back_urls: {
          success: `${frontendUrl}/payment/success`,
          failure: `${frontendUrl}/payment/rejected`,
          pending: `${frontendUrl}/payment/pending`
        },
        notification_url: `${process.env.API_PUBLIC_URL || frontendUrl}/api/payments/webhook`,
        external_reference: paymentId,
        metadata: {
          payment_id: paymentId,
          product: PRODUCT.name,
          main_profile: parsed.resultSummary?.mainProfile || "",
          compatibility: String(parsed.resultSummary?.compatibility || "")
        }
      })
    });

    const preferenceData = await preferenceResponse.json();

    if (!preferenceResponse.ok) {
      const message =
        preferenceData?.message ||
        preferenceData?.error ||
        "Mercado Pago no pudo crear la preferencia.";

      const failedPayment = updatePaymentStatus(paymentId, {
        estado_pago: "failed",
        id_transaccion: null,
        transaction_id: null,
        error_message: message
      });

      return { payment: failedPayment, preference: null };
    }

    const pendingPayment = updatePaymentStatus(paymentId, {
      estado_pago: "pending",
      id_transaccion: null,
      transaction_id: null,
      provider_reference: preferenceData.id,
      error_message: null
    });

    return {
      payment: {
        ...pendingPayment,
        provider_reference: preferenceData.id
      },
      preference: {
        id: preferenceData.id,
        initPoint: preferenceData.init_point,
        sandboxInitPoint: preferenceData.sandbox_init_point
      }
    };
  } catch (error) {
    const failedPayment = updatePaymentStatus(paymentId, {
      estado_pago: "failed",
      id_transaccion: null,
      transaction_id: null,
      error_message: error.message
    });

    return { payment: failedPayment, preference: null };
  }
}

export async function confirmMercadoPagoPayment(payload) {
  const accessToken = getAccessToken();
  const mercadoPagoPaymentId = String(
    payload.payment_id || payload.collection_id || ""
  );
  const externalReference = String(payload.external_reference || "");
  const preferenceId = String(payload.preference_id || "");

  if (!mercadoPagoPaymentId && !externalReference && !preferenceId) {
    throw new Error("No se recibio payment_id, external_reference ni preference_id.");
  }

  let internalPayment = externalReference
    ? getPaymentById(externalReference)
    : null;

  if (!internalPayment && preferenceId) {
    internalPayment = getPaymentByProviderReference(preferenceId);
  }

  if (!mercadoPagoPaymentId) {
    if (!internalPayment) {
      throw new Error("Pago interno no encontrado.");
    }

    return internalPayment;
  }

  const paymentResponse = await fetch(
    `${MERCADOPAGO_PAYMENTS_URL}/${mercadoPagoPaymentId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  const paymentData = await paymentResponse.json();

  if (!paymentResponse.ok) {
    if (!internalPayment) {
      throw new Error(
        paymentData?.message ||
          paymentData?.error ||
          "No se pudo verificar el pago en Mercado Pago."
      );
    }

    return updatePaymentStatus(internalPayment.id, {
      estado_pago: "failed",
      id_transaccion: mercadoPagoPaymentId,
      transaction_id: mercadoPagoPaymentId,
      error_message:
        paymentData?.message ||
        paymentData?.error ||
        "No se pudo verificar el pago en Mercado Pago."
    });
  }

  if (!internalPayment && paymentData.external_reference) {
    internalPayment = getPaymentById(paymentData.external_reference);
  }

  if (!internalPayment) {
    throw new Error("Pago interno no encontrado.");
  }

  const estadoPago = mapMercadoPagoStatus(paymentData.status);
  const updatedPayment = updatePaymentStatus(internalPayment.id, {
    estado_pago: estadoPago,
    id_transaccion: String(paymentData.id || mercadoPagoPaymentId),
    transaction_id: String(paymentData.id || mercadoPagoPaymentId),
    error_message:
      estadoPago === "failed"
        ? paymentData.status_detail || "Mercado Pago rechazo el pago."
        : null
  });

  if (estadoPago === "paid") {
    markUserPremium(internalPayment.user_id);
  }

  return updatedPayment;
}

export function getPayment(id) {
  return getPaymentById(id);
}

export function getPublicConfig() {
  return {
    mercadopagoPublicKey: process.env.MERCADOPAGO_PUBLIC_KEY || "",
    product: PRODUCT
  };
}
