import { Pool } from "pg";

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "ecommerce",
  password: "marcial",
  max: 40,
  idle_in_transaction_session_timeout: 30000,
  connectionTimeoutMillis: 2000,
});
