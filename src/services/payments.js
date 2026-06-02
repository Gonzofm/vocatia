const API_URL = import.meta.env.VITE_API_URL || "";

export async function getPaymentConfig() {
  const response = await fetch(`${API_URL}/api/config`);

  if (!response.ok) {
    throw new Error("No se pudo cargar la configuracion de pago.");
  }

  return response.json();
}

export async function createPaymentPreference(payload) {
  const response = await fetch(`${API_URL}/api/payments/preference`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      data?.payment?.error_message ||
      data?.error ||
      "No se pudo iniciar el checkout de Mercado Pago.";

    const error = new Error(message);
    error.payment = data.payment;
    throw error;
  }

  return data;
}

export async function confirmPayment(searchParams) {
  const response = await fetch(
    `${API_URL}/api/payments/confirm?${searchParams.toString()}`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "No se pudo confirmar el pago.");
  }

  return data;
}

export async function createSessionRequest(payload) {
  const response = await fetch(`${API_URL}/api/session-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "No se pudo registrar la solicitud.");
  }

  return data;
}
