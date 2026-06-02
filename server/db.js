import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");
const schemaPath = path.join(__dirname, "schema.sql");
const dbPath = path.join(dataDir, "vocatia.sqlite");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const db = new Database(dbPath);

const schema = fs.readFileSync(schemaPath, "utf8");
db.exec(schema);

ensureColumn("payments", "user_id", "TEXT");
ensureColumn("payments", "email", "TEXT");
ensureColumn("payments", "proveedor_pago", "TEXT NOT NULL DEFAULT 'mercadopago'");
ensureColumn("payments", "transaction_id", "TEXT");
ensureColumn("payments", "provider_reference", "TEXT");

function ensureColumn(table, column, definition) {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all();
  const exists = columns.some((item) => item.name === column);

  if (!exists) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
}

export function upsertUser(user) {
  const existing = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(user.email);

  if (existing) {
    db.prepare(
      `UPDATE users
       SET name = @name,
           phone = @phone,
           premium_status = premium_status
       WHERE email = @email`
    ).run({
      name: user.name,
      email: user.email,
      phone: user.phone || existing.phone
    });

    return getUserByEmail(user.email);
  }

  db.prepare(
    `INSERT INTO users (
      id,
      name,
      email,
      phone,
      premium_status,
      created_at
    ) VALUES (
      @id,
      @name,
      @email,
      @phone,
      @premium_status,
      @created_at
    )`
  ).run(user);

  return getUserByEmail(user.email);
}

export function markUserPremium(userId) {
  db.prepare(
    `UPDATE users
     SET premium_status = 'active'
     WHERE id = ?`
  ).run(userId);
}

export function getUserByEmail(email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
}

export function createPayment(payment) {
  db.prepare(
    `INSERT INTO payments (
      id,
      user_id,
      email,
      usuario_nombre,
      usuario_email,
      usuario_telefono,
      producto,
      monto,
      moneda,
      estado_pago,
      proveedor_pago,
      id_transaccion,
      transaction_id,
      provider_reference,
      error_message,
      fecha
    ) VALUES (
      @id,
      @user_id,
      @email,
      @usuario_nombre,
      @usuario_email,
      @usuario_telefono,
      @producto,
      @monto,
      @moneda,
      @estado_pago,
      @proveedor_pago,
      @id_transaccion,
      @transaction_id,
      @provider_reference,
      @error_message,
      @fecha
    )`
  ).run(payment);

  return getPaymentById(payment.id);
}

export function updatePaymentStatus(id, update) {
  db.prepare(
    `UPDATE payments
     SET estado_pago = @estado_pago,
         id_transaccion = @id_transaccion,
         transaction_id = @transaction_id,
         provider_reference = COALESCE(@provider_reference, provider_reference),
         error_message = @error_message
     WHERE id = @id`
  ).run({
    id,
    estado_pago: update.estado_pago,
    id_transaccion: update.id_transaccion || null,
    transaction_id: update.transaction_id || update.id_transaccion || null,
    provider_reference: update.provider_reference || null,
    error_message: update.error_message || null
  });

  return getPaymentById(id);
}

export function getPaymentById(id) {
  return db.prepare("SELECT * FROM payments WHERE id = ?").get(id);
}

export function getPaymentByProviderReference(providerReference) {
  return db
    .prepare("SELECT * FROM payments WHERE provider_reference = ?")
    .get(providerReference);
}

export function createSessionRequest(request) {
  db.prepare(
    `INSERT INTO session_requests (
      id,
      user_id,
      nombre,
      correo,
      whatsapp,
      disponibilidad,
      motivo,
      estado,
      fecha
    ) VALUES (
      @id,
      @user_id,
      @nombre,
      @correo,
      @whatsapp,
      @disponibilidad,
      @motivo,
      @estado,
      @fecha
    )`
  ).run(request);

  return db
    .prepare("SELECT * FROM session_requests WHERE id = ?")
    .get(request.id);
}
