import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    // Check if email already exists
    const [existing] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (existing.length > 0) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    await db.execute(
      "INSERT INTO users (username, email, password, mobile) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, ""]
    );

    await db.end();

    return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Error registering user" }), { status: 500 });
  }
}
