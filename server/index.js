import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { nanoid } from "nanoid";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ZodError } from "zod";
import { z } from "zod";
import { createSessionRequest, getUserByEmail } from "./db.js";
import {
  confirmMercadoPagoPayment,
  createPaymentPreference,
  getPayment,
  getPublicConfig
} from "./payments.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigin = process.env.WEB_ORIGIN || "http://127.0.0.1:5173";

app.use(helmet());
app.use(
  cors({
    origin: [allowedOrigin, "http://localhost:5173"],
    credentials: true
  })
);
app.use(express.json({ limit: "64kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/config", (_req, res) => {
  res.json(getPublicConfig());
});

app.post("/api/payments/preference", async (req, res) => {
  try {
    const result = await createPaymentPreference(req.body);

    res.status(result.preference ? 201 : 502).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        error: "Payload invalido",
        details: error.issues
      });
      return;
    }

    res.status(500).json({
      error: error.message || "No se pudo procesar el pago."
    });
  }
});

app.get("/api/payments/confirm", async (req, res) => {
  try {
    const payment = await confirmMercadoPagoPayment(req.query);

    res.json({
      payment,
      premiumUnlocked: payment.estado_pago === "paid"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || "No se pudo confirmar el pago."
    });
  }
});

app.post("/api/payments/webhook", async (req, res) => {
  try {
    const type = req.body.type || req.body.topic;
    const paymentId = req.body?.data?.id || req.query.id;

    if (type === "payment" && paymentId) {
      await confirmMercadoPagoPayment({ payment_id: paymentId });
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({
      error: error.message || "No se pudo procesar el webhook."
    });
  }
});

app.get("/api/payments/:id", (req, res) => {
  const payment = getPayment(req.params.id);

  if (!payment) {
    res.status(404).json({ error: "Pago no encontrado" });
    return;
  }

  res.json({ payment });
});

const sessionRequestSchema = z.object({
  nombre: z.string().min(2).max(120),
  correo: z.string().email(),
  whatsapp: z.string().min(6).max(30),
  disponibilidad: z.string().min(3).max(220),
  motivo: z.string().min(5).max(800)
});

app.post("/api/session-requests", (req, res) => {
  try {
    const parsed = sessionRequestSchema.parse(req.body);
    const user = getUserByEmail(parsed.correo);
    const request = createSessionRequest({
      id: nanoid(),
      user_id: user?.id || null,
      nombre: parsed.nombre,
      correo: parsed.correo,
      whatsapp: parsed.whatsapp,
      disponibilidad: parsed.disponibilidad,
      motivo: parsed.motivo,
      estado: "pendiente",
      fecha: new Date().toISOString()
    });

    res.status(201).json({ request });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        error: "Solicitud invalida",
        details: error.issues
      });
      return;
    }

    res.status(500).json({
      error: error.message || "No se pudo registrar la solicitud."
    });
  }
});

app.listen(port, () => {
  console.log(`Vocatia API escuchando en http://127.0.0.1:${port}`);
});
