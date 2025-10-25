import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function POST(req) {
  const { category, budget_amount } = await req.json();

  try {
    const db = await getDB();
    await db.query(
      `INSERT INTO budgets (user_id, category, budget_amount)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE budget_amount = VALUES(budget_amount)`,
      [userId, category, budget_amount]
    );

    return NextResponse.json({ message: "Budget saved successfully" });
  } catch (err) {
    console.error("Budget insert error:", err);
    return NextResponse.json(
      { error: "Failed to save budget" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDB();
    const [rows] = await db.query(`
      SELECT 
        b.category,
        b.budget_amount,
        COALESCE(SUM(e.amount), 0) AS total_spent
      FROM budgets b
      LEFT JOIN expenses e 
        ON e.transaction_type = b.category
        AND e.date >= DATE_FORMAT(CURDATE(), '%Y-%m-01')   -- first day of month
        AND e.date < DATE_ADD(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 1 MONTH)  -- next month
      GROUP BY b.category, b.budget_amount
      ORDER BY b.category;
    `);

    return NextResponse.json(rows);
  } catch (err) {
    console.error("Fetch budgets error:", err);
    return NextResponse.json(
      { error: "Failed to fetch budgets" },
      { status: 500 }
    );
  }
}
