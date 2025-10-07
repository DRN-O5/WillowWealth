import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Utility: format MySQL date to weekday
const getDayName = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", { weekday: "long" });

export async function GET() {
  try {
    const [expenses] = await db.query("SELECT * FROM expenses");

    // 🟩 Area chart: total amount per weekday (current week)
    const weekData = {};
    expenses.forEach((e) => {
      const day = getDayName(e.date);
      weekData[day] = (weekData[day] || 0) + Number(e.amount);
    });

    const areaData = Object.entries(weekData).map(([day, amount]) => ({
      name: day,
      total: amount,
    }));

    // 🟦 Pie chart: percentage by payment method
    const methodData = {};
    expenses.forEach((e) => {
      methodData[e.payment_method] =
        (methodData[e.payment_method] || 0) + Number(e.amount);
    });

    const pieData = Object.entries(methodData).map(([method, value]) => ({
      name: method,
      value,
    }));

    // 🟥 Line chart: total transactions per day of current month
    const monthlyData = {};
    expenses.forEach((e) => {
      const date = new Date(e.date);
      const day = date.getDate();
      monthlyData[day] = (monthlyData[day] || 0) + Number(e.amount);
    });

    const lineData = Object.entries(monthlyData).map(([day, total]) => ({
      day: Number(day),
      total,
    }));

    return NextResponse.json({ areaData, pieData, lineData });
  } catch (err) {
    console.error("GET /api/stats error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
