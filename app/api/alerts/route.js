import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendSMS } from "@/lib/sendSMS";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    // ✅ Defensive parsing
    const { searchParams } = new URL(req.url || "http://localhost");
    const username = searchParams.get("username");
    const display = searchParams.get("display");

    // ✅ Gracefully handle missing username (don’t throw!)
    if (!username) {
      return NextResponse.json(
        { message: "No username provided — skipping alert processing." },
        { status: 200 }
      );
    }

    if (display === "true") {
      const [alerts] = await db.query(`
        SELECT id, user_id, category, message, is_enabled, sent_at
        FROM alerts
        ORDER BY sent_at DESC
      `);
      return NextResponse.json(alerts);
    }

    const [rows] = await db.query(`
      SELECT 
        b.category,
        b.budget_amount,
        IFNULL(SUM(e.amount), 0) AS total_spent,
        u.user_id,
        u.mobile
      FROM budgets b
      JOIN users u ON u.user_id = b.user_id
      LEFT JOIN expenses e 
        ON e.transaction_type = b.category
        AND MONTH(e.date) = MONTH(CURDATE())
        AND YEAR(e.date) = YEAR(CURDATE())
      GROUP BY b.category, b.budget_amount, u.user_id, u.mobile;
    `);

    for (const row of rows) {
      const { category, budget_amount, total_spent, user_id, mobile } = row;
      const spentPercent = (total_spent / budget_amount) * 100;

      let alertType = null;
      let message = "";

      if (spentPercent >= 80 && spentPercent < 100) {
        alertType = "warning";
        message = `⚠️ You have ₹${(budget_amount - total_spent).toFixed(
          2
        )} left before reaching your ${category} limit! - WillowWealth`;
      } else if (spentPercent >= 100) {
        alertType = "limit_exceeded";
        message = `⚠️ You have exceeded your ${category} limit by ₹${(
          total_spent - budget_amount
        ).toFixed(2)}! - WillowWealth`;
      }

      if (alertType) {
        const [existingAlert] = await db.query(
          `
          SELECT * FROM alerts 
          WHERE user_id = ? 
            AND category = ? 
            AND alert_type = ? 
            AND MONTH(created_at) = MONTH(CURDATE()) 
            AND YEAR(created_at) = YEAR(CURDATE())
        `,
          [user_id, category, alertType]
        );

        if (existingAlert.length === 0) {
          if (mobile) await sendSMS(mobile, message);
          await db.query(
            `INSERT INTO alerts (user_id, category, alert_type, message, is_enabled)
             VALUES (?, ?, ?, ?, TRUE)`,
            [user_id, category, alertType, message]
          );
        }
      }
    }

    return NextResponse.json({ message: "Alerts processed successfully" });
  } catch (err) {
    console.error("Alerts error:", err);
    return NextResponse.json({ error: "Failed to process alerts" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { alert_id, is_enabled } = await req.json();
    await db.query(
      `UPDATE alerts SET is_enabled = ? WHERE alert_id = ?`,
      [is_enabled, alert_id]
    );
    return NextResponse.json({ message: "Alert updated successfully" });
  } catch (err) {
    console.error("Update alert error:", err);
    return NextResponse.json({ error: "Failed to update alert" }, { status: 500 });
  }
}
