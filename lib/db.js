import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config(); // ensure env vars are loaded

export async function getDB() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: false // for testing; use CA cert in production
    },
  });
  return db;
}
