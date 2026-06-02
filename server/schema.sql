CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  premium_status TEXT NOT NULL DEFAULT 'inactive',
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  email TEXT,
  usuario_nombre TEXT NOT NULL,
  usuario_email TEXT NOT NULL,
  usuario_telefono TEXT,
  producto TEXT NOT NULL,
  monto INTEGER NOT NULL,
  moneda TEXT NOT NULL DEFAULT 'PEN',
  estado_pago TEXT NOT NULL,
  proveedor_pago TEXT NOT NULL DEFAULT 'mercadopago',
  id_transaccion TEXT,
  transaction_id TEXT,
  provider_reference TEXT,
  error_message TEXT,
  fecha TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS session_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  nombre TEXT NOT NULL,
  correo TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  disponibilidad TEXT NOT NULL,
  motivo TEXT NOT NULL,
  estado TEXT NOT NULL DEFAULT 'pendiente',
  fecha TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
