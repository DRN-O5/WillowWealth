import { getDB } from "./lib/db.js";

(async () => {
  try {
    const db = await getDB();
    const [rows] = await db.query("SHOW TABLES");
    console.log("✅ Connected to DB successfully. Tables:", rows);
    process.exit(0);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
})();
