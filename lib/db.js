import mysql from "mysql2/promise";

let pool;

export async function getDB() {
  if (!pool) {
    // ✅ Initialize only once, and only when needed
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
  }
  return pool;
}