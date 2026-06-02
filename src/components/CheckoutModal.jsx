import { useEffect, useMemo, useState } from "react";
import {
  createPaymentPreference,
  getPaymentConfig
} from "../services/payments";

function CheckoutModal({ isOpen, asPage = false, onClose, result }) {
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [config, setConfig] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const product = config?.product || {
    name: "Plan Premium Vocatia",
    amount: 4990,
    currency: "PEN"
  };

  const priceLabel = useMemo(
    () => `S/ ${(product.amount / 100).toFixed(2)}`,
    [product.amount]
  );

  useEffect(() => {
    if (!isOpen) return;

    getPaymentConfig()
      .then(setConfig)
      .catch((error) => {
        setPaymentStatus("failed");
        setMessage(error.message);
      });
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLead((currentLead) => ({
      ...currentLead,
      [name]: value
    }));
  };

  const openMercadoPagoCheckout = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setPaymentStatus("pending");
    setMessage("Creando checkout seguro de Mercado Pago...");

    try {
      const response = await createPaymentPreference({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        resultSummary: {
          mainProfile: result?.mainProfile,
          compatibility: result?.compatibility
        }
      });

      const checkoutUrl =
        response.preference?.initPoint || response.preference?.sandboxInitPoint;

      if (!checkoutUrl) {
        throw new Error("Mercado Pago no devolvio una URL de checkout.");
      }

      localStorage.setItem(
        "vocatiaPendingPayment",
        JSON.stringify({
          ...lead,
          product: product.name,
          price: priceLabel,
          paymentId: response.payment.id,
          preferenceId: response.preference.id,
          startedAt: new Date().toISOString()
        })
      );

      window.location.href = checkoutUrl;
    } catch (error) {
      setPaymentStatus("failed");
      setMessage(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div
      className={asPage ? "checkout-page" : "checkout-overlay"}
      role={asPage ? undefined : "dialog"}
      aria-modal={asPage ? undefined : "true"}
    >
      <form className="checkout-modal" onSubmit={openMercadoPagoCheckout}>
        <div className="checkout-head">
          <div>
            <span className="v2-premium-pill">Mercado Pago</span>
            <h2>Activa tu Plan Premium Vocatia</h2>
            <p>
              El pago se realiza con Checkout Pro. El Access Token se usa solo
              en el backend para crear y verificar la preferencia.
            </p>
          </div>

          <button className="checkout-close" type="button" onClick={onClose}>
            x
          </button>
        </div>

        <div className="checkout-price">
          <span>{product.name}</span>
          <strong>{priceLabel}</strong>
        </div>

        <div className="checkout-fields">
          <label>
            Nombre
            <input
              name="name"
              value={lead.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </label>

          <label>
            Correo
            <input
              name="email"
              type="email"
              value={lead.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </label>

          <label>
            WhatsApp
            <input
              name="phone"
              value={lead.phone}
              onChange={handleChange}
              placeholder="Numero de contacto"
            />
          </label>
        </div>

        <div className={`checkout-status checkout-status-${paymentStatus}`}>
          <strong>
            {paymentStatus === "failed" ? "Pago fallido" : "Pago pendiente"}
          </strong>
          <p>
            {message ||
              "Completa tus datos para abrir el checkout de Mercado Pago."}
          </p>
        </div>

        <button className="checkout-submit" type="submit" disabled={isLoading}>
          {isLoading ? "Abriendo checkout..." : `Pagar ${priceLabel}`}
        </button>
      </form>
    </div>
  );
}

export default CheckoutModal;
