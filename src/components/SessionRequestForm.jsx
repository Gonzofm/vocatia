import { useState } from "react";
import { createSessionRequest } from "../services/payments";

function SessionRequestForm({ lead }) {
  const [form, setForm] = useState({
    nombre: lead?.name || "",
    correo: lead?.email || "",
    whatsapp: lead?.phone || "",
    disponibilidad: "",
    motivo: ""
  });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("pending");
    setMessage("Registrando solicitud...");

    try {
      await createSessionRequest(form);
      setStatus("success");
      setMessage("Solicitud enviada. Te contactaremos por WhatsApp para coordinar.");
    } catch (error) {
      setStatus("failed");
      setMessage(error.message);
    }
  };

  return (
    <form className="session-request-form" onSubmit={handleSubmit}>
      <div className="session-form-grid">
        <label>
          Nombre
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
        </label>

        <label>
          Correo
          <input
            name="correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          WhatsApp
          <input
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Disponibilidad
          <input
            name="disponibilidad"
            value={form.disponibilidad}
            onChange={handleChange}
            placeholder="Ej. lunes o miercoles por la tarde"
            required
          />
        </label>
      </div>

      <label>
        Motivo de consulta
        <textarea
          name="motivo"
          value={form.motivo}
          onChange={handleChange}
          placeholder="Cuéntanos qué duda vocacional quieres trabajar."
          required
        />
      </label>

      <button className="v2-premium-btn" type="submit" disabled={status === "pending"}>
        {status === "pending" ? "Enviando..." : "Solicitar sesion mensual"}
      </button>

      {message && (
        <p className={`session-request-message session-request-${status}`}>
          {message}
        </p>
      )}
    </form>
  );
}

export default SessionRequestForm;
