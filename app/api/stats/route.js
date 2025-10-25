import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";


export async function GET() {
  try {
    // Fetch all expenses
    const db = await getDB();
    const [expenses] = await db.query(
      "SELECT * FROM expenses ORDER BY date DESC"
    );

    // Get current date and 7 days ago (India timezone)
    const now = new Date();
    const indiaNow = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    const sevenDaysAgo = new Date(indiaNow);
    sevenDaysAgo.setDate(indiaNow.getDate() - 6); // last 7 days including today

    // Filter only last 7 days
    const recentWeekExpenses = expenses.filter((e) => {
      const expDate = new Date(e.date);
      return expDate >= sevenDaysAgo && expDate <= indiaNow;
    });

    // 🟩 Prepare chart data for each day (last 7 days)
    const weekData = {};
    for (let i = 0; i < 7; i++) {
      const day = new Date(sevenDaysAgo);
      day.setDate(sevenDaysAgo.getDate() + i);
      const dayName = day.toLocaleDateString("en-IN", { weekday: "short" });
      weekData[dayName] = 0;
    }

    // Sum total amount per day
    recentWeekExpenses.forEach((e) => {
      const dayName = new Date(e.date).toLocaleDateString("en-IN", {
        weekday: "short",
      });
      weekData[dayName] = (weekData[dayName] || 0) + Number(e.amount);
    });

    // Convert to array for Recharts
    const areaData = Object.entries(weekData).map(([day, total]) => ({
      name: day,
      total,
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

    // Define start of the 30-day window
    const thirtyDaysAgo = new Date(indiaNow);
    thirtyDaysAgo.setDate(indiaNow.getDate() - 29); // last 30 days (including today)

    // Filter expenses from the last 30 days
    const recentExpenses = expenses.filter((e) => {
      const expDate = new Date(e.date);
      return expDate >= thirtyDaysAgo && expDate <= indiaNow;
    });

    // 🟩 Prepare empty structure for each of the last 30 days
    const monthlyData = {};
    for (let i = 0; i < 30; i++) {
      const day = new Date(thirtyDaysAgo);
      day.setDate(thirtyDaysAgo.getDate() + i);
      const label = day.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });
      monthlyData[label] = 0;
    }

    // 🟩 Sum total per day
    recentExpenses.forEach((e) => {
      const label = new Date(e.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });
      monthlyData[label] = (monthlyData[label] || 0) + Number(e.amount);
    });

    // 🟩 Convert to array for Recharts
    const lineData = Object.entries(monthlyData).map(([day, total]) => ({
      name: day, // ex: "05 Oct"
      total,
    }));

    return NextResponse.json({ areaData, pieData, lineData });
  } catch (err) {
    console.error("GET /api/stats error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
