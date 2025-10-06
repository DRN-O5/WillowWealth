import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// 🟩 GET /api/expenses
export async function GET() {
  try {
    const [rows] = await db.query(`SELECT * FROM expenses ORDER BY date DESC`);
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error("GET /api/expenses error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// 🟩 POST /api/expenses
export async function POST(request) {
  try {
    const body = await request.json();

    const { description, transactionType, paymentMethod, amount } = body;

    // Validate input
    if (!description || !transactionType || !paymentMethod || !amount) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // 🕒 Compute current date & day in Indian timezone
    const now = new Date();
    const istDate = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const dayName = istDate.toLocaleString("en-IN", { weekday: "long", timeZone: "Asia/Kolkata" }); // e.g. "Monday"

    // 🧾 Insert into DB (including new `day` column)
    const [result] = await db.query(
      `INSERT INTO expenses 
        (description, transaction_type, payment_method, amount, date, day)
        VALUES (?, ?, ?, ?, ?, ?)`,
      [description, transactionType, paymentMethod, amount, istDate, dayName]
    );

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (err) {
    console.error("POST /api/expenses error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
