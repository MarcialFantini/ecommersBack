"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    host: "localhost",
    user: "postgres",
    database: "ecommerce",
    password: "marcial",
    max: 40,
    idle_in_transaction_session_timeout: 30000,
    connectionTimeoutMillis: 2000,
});
