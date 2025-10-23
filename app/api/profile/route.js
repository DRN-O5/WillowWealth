// app/api/profile/route.js
import mysql, { format } from "mysql2/promise";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, mobile } = body;

    if (!username || !email || !mobile) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    // Check if user already exists by email
    const [existingUser] = await db.execute(
      "SELECT user_id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      // Update existing user
      const formattedMobile = mobile.startsWith("+91") ? mobile : `+91${mobile}`;
      await db.execute(
        "UPDATE users SET username = ?, mobile = ? WHERE email = ?",
        [username, formattedMobile, email]
      );
      await db.end();
      return new Response(JSON.stringify({ message: "Profile updated successfully" }), { status: 200 });
    } else {
      // Insert new user
      const formattedMobile = mobile.startsWith("+91") ? mobile : `+91${mobile}`;
      await db.execute(
        "INSERT INTO users (username, email, mobile) VALUES (?, ?, ?)",
        [username, email, formattedMobile]
      );
      await db.end();
      return new Response(JSON.stringify({ message: "User created successfully" }), { status: 201 });
    }
  } catch (error) {
    console.error("Database error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}
