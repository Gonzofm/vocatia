import { nanoid } from "nanoid";
import process from "node:process";
import { z } from "zod";

const MERCADOPAGO_PREFERENCES_URL =
  "https://api.mercadopago.com/checkout/preferences";
const MERCADOPAGO_PAYMENTS_URL = "https://api.mercadopago.com/v1/payments";

const PRODUCT = {
  name: "Plan Premium Vocatia",
  amount: 4990,
  currency: "PEN"
};

const preferenceSchema = z.object({
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

const sessionRequestSchema = z.object({
  nombre: z.string().min(2).max(120),
  correo: z.string().email(),
  whatsapp: z.string().min(6).max(30),
  disponibilidad: z.string().min(3).max(220),
  motivo: z.string().min(5).max(800)
});

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
}

function getAccessToken() {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("MERCADOPAGO_ACCESS_TOKEN no esta configurada en Netlify.");
  }

  return accessToken;
}

function getPath(event) {
  const path = event.path || "";
  const marker = "/.netlify/functions/api/";

  if (path.startsWith(marker)) return `/${path.slice(marker.length)}`;
  if (path.startsWith("/api/")) return path.slice(4);

  return "/";
}

function getOrigin(event) {
  if (process.env.WEB_ORIGIN) return process.env.WEB_ORIGIN;

  const protocol = event.headers["x-forwarded-proto"] || "https";
  const host = event.headers["x-forwarded-host"] || event.headers.host;

  return `${protocol}://${host}`;
}

function mapMercadoPagoStatus(status) {
  if (status === "approved") return "paid";
  if (["rejected", "cancelled", "refunded"].includes(status)) return "failed";

  return "pending";
}

async function createPaymentPreference(event) {
  const accessToken = getAccessToken();
  const parsed = preferenceSchema.parse(JSON.parse(event.body || "{}"));
  const paymentId = nanoid();
  const now = new Date().toISOString();
  const frontendUrl = getOrigin(event);

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
      notification_url: `${
        process.env.API_PUBLIC_URL || frontendUrl
      }/api/payments/webhook`,
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
    return json(502, {
      payment: {
        id: paymentId,
        producto: PRODUCT.name,
        monto: PRODUCT.amount,
        moneda: PRODUCT.currency,
        estado_pago: "failed",
        proveedor_pago: "mercadopago",
        transaction_id: null,
        error_message:
          preferenceData?.message ||
          preferenceData?.error ||
          "Mercado Pago no pudo crear la preferencia.",
        fecha: now
      },
      preference: null
    });
  }

  return json(201, {
    payment: {
      id: paymentId,
      email: parsed.email,
      usuario_nombre: parsed.name,
      usuario_email: parsed.email,
      usuario_telefono: parsed.phone || null,
      producto: PRODUCT.name,
      monto: PRODUCT.amount,
      moneda: PRODUCT.currency,
      estado_pago: "pending",
      proveedor_pago: "mercadopago",
      transaction_id: null,
      provider_reference: preferenceData.id,
      fecha: now
    },
    preference: {
      id: preferenceData.id,
      initPoint: preferenceData.init_point,
      sandboxInitPoint: preferenceData.sandbox_init_point
    }
  });
}

async function confirmMercadoPagoPayment(event) {
  const accessToken = getAccessToken();
  const params = event.queryStringParameters || {};
  const mercadoPagoPaymentId = String(
    params.payment_id || params.collection_id || ""
  );

  if (!mercadoPagoPaymentId) {
    return json(200, {
      payment: {
        id: params.external_reference || "",
        producto: PRODUCT.name,
        monto: PRODUCT.amount,
        moneda: PRODUCT.currency,
        estado_pago: "pending",
        proveedor_pago: "mercadopago",
        transaction_id: null,
        fecha: new Date().toISOString()
      },
      premiumUnlocked: false
    });
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
    return json(502, {
      error:
        paymentData?.message ||
        paymentData?.error ||
        "No se pudo verificar el pago en Mercado Pago."
    });
  }

  const estadoPago = mapMercadoPagoStatus(paymentData.status);
  const payment = {
    id: paymentData.external_reference || params.external_reference || "",
    producto: PRODUCT.name,
    monto: Math.round(Number(paymentData.transaction_amount || 49.9) * 100),
    moneda: paymentData.currency_id || PRODUCT.currency,
    estado_pago: estadoPago,
    proveedor_pago: "mercadopago",
    id_transaccion: String(paymentData.id || mercadoPagoPaymentId),
    transaction_id: String(paymentData.id || mercadoPagoPaymentId),
    fecha: paymentData.date_approved || paymentData.date_created || new Date().toISOString(),
    error_message:
      estadoPago === "failed"
        ? paymentData.status_detail || "Mercado Pago rechazo el pago."
        : null
  };

  return json(200, {
    payment,
    premiumUnlocked: estadoPago === "paid"
  });
}

async function createSessionRequest(event) {
  const parsed = sessionRequestSchema.parse(JSON.parse(event.body || "{}"));

  return json(201, {
    request: {
      id: nanoid(),
      ...parsed,
      estado: "pendiente",
      fecha: new Date().toISOString()
    }
  });
}

export async function handler(event) {
  try {
    if (event.httpMethod === "OPTIONS") {
      return json(204, {});
    }

    const path = getPath(event);

    if (event.httpMethod === "GET" && path === "/config") {
      return json(200, {
        mercadopagoPublicKey: process.env.MERCADOPAGO_PUBLIC_KEY || "",
        product: PRODUCT
      });
    }

    if (event.httpMethod === "POST" && path === "/payments/preference") {
      return createPaymentPreference(event);
    }

    if (event.httpMethod === "GET" && path === "/payments/confirm") {
      return confirmMercadoPagoPayment(event);
    }

    if (event.httpMethod === "POST" && path === "/payments/webhook") {
      return json(200, { ok: true });
    }

    if (event.httpMethod === "POST" && path === "/session-requests") {
      return createSessionRequest(event);
    }

    return json(404, { error: "Endpoint no encontrado" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return json(400, {
        error: "Payload invalido",
        details: error.issues
      });
    }

    return json(500, {
      error: error.message || "No se pudo procesar la solicitud."
    });
  }
}
