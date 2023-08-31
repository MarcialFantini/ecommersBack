import { Pool } from "pg";

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "postgres",
  password: "marcial",
  max: 40,
  idle_in_transaction_session_timeout: 30000,
  connectionTimeoutMillis: 2000,
  port: 5432,
});
