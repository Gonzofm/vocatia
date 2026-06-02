import { useEffect, useMemo, useState } from "react";
import { confirmPayment } from "../services/payments";

const PAGE_COPY = {
  success: {
    pill: "Pago exitoso",
    title: "Tu Plan Premium Vocatia esta activo",
    body: "Estamos verificando el pago con Mercado Pago para activar tu informe premium.",
    statusClass: "success",
    primary: "Ver informe premium"
  },
  rejected: {
    pill: "Pago rechazado",
    title: "Mercado Pago rechazo el pago",
    body: "No se activo el plan premium. Puedes intentarlo nuevamente con otro medio de pago.",
    statusClass: "failed",
    primary: "Intentar otra vez"
  },
  pending: {
    pill: "Pago pendiente",
    title: "Tu pago esta pendiente",
    body: "Mercado Pago aun esta procesando la operacion. Cuando se apruebe, podras activar el plan premium.",
    statusClass: "pending",
    primary: "Volver al test"
  }
};

function getPendingLead() {
  const storedLead = localStorage.getItem("vocatiaPendingPayment");
  return storedLead ? JSON.parse(storedLead) : null;
}

function PaymentStatus({ status, onHome, onRetry, onUnlock }) {
  const copy = PAGE_COPY[status] || PAGE_COPY.pending;
  const [message, setMessage] = useState(copy.body);
  const [payment, setPayment] = useState(null);
  const [isChecking, setIsChecking] = useState(status !== "rejected");

  const query = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );

  useEffect(() => {
    let isMounted = true;

    const verifyPayment = async () => {
      if (!query.toString()) {
        setIsChecking(false);
        return;
      }

      try {
        const response = await confirmPayment(query);

        if (!isMounted) return;

        setPayment(response.payment);

        if (response.premiumUnlocked) {
          const pendingLead = getPendingLead();
          const premiumLead = {
            ...pendingLead,
            paymentId: response.payment.id,
            transactionId: response.payment.transaction_id,
            amount: response.payment.monto,
            paymentStatus: response.payment.estado_pago,
            unlockedAt: response.payment.fecha
          };

          localStorage.setItem("vocatiaPremiumActive", "true");
          localStorage.setItem("vocatiaLead", JSON.stringify(premiumLead));
          localStorage.removeItem("vocatiaPendingPayment");
          onUnlock(premiumLead);
          setMessage("Pago aprobado y plan premium activado.");
          return;
        }

        setMessage(
          response.payment.estado_pago === "failed"
            ? response.payment.error_message || "El pago fue rechazado."
            : "El pago sigue pendiente de aprobacion."
        );
      } catch (error) {
        if (isMounted) {
          setMessage(error.message);
        }
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    verifyPayment();

    return () => {
      isMounted = false;
    };
  }, [onUnlock, query]);

  return (
    <main className="checkout-page payment-status-page">
      <section className="checkout-modal payment-status-card">
        <span className="v2-premium-pill">{copy.pill}</span>
        <h2>{copy.title}</h2>
        <p>{message}</p>

        <div className={`checkout-status checkout-status-${copy.statusClass}`}>
          <strong>{isChecking ? "Verificando pago..." : "Estado del pago"}</strong>
          <p>
            {payment
              ? `Transaccion: ${payment.transaction_id || "pendiente"} | Monto: S/ ${(
                  payment.monto / 100
                ).toFixed(2)} | Estado: ${payment.estado_pago}`
              : "Aun no hay una transaccion confirmada."}
          </p>
        </div>

        <div className="payment-status-actions">
          <button
            className="checkout-submit"
            type="button"
            onClick={status === "rejected" ? onRetry : onHome}
          >
            {copy.primary}
          </button>
          <button className="v2-back-btn" type="button" onClick={onHome}>
            Volver al inicio
          </button>
        </div>
      </section>
    </main>
  );
}

export default PaymentStatus;
