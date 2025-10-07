"use client";
import { useEffect, useState } from "react";

export default function ExpensesTable() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/expenses", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("GET /api/expenses failed:", res.status, text);
        setError(`Server error: ${res.status}`);
        setExpenses([]);
        return;
      }

      const data = await res.json();
      if (Array.isArray(data)) {
        setExpenses(data);
      } else {
        console.error("Unexpected response shape:", data);
        setError("Invalid response from server (expected array).");
        setExpenses([]);
      }
    } catch (err) {
      console.error("Fetch error GET /api/expenses:", err);
      setError(err.message || "Network error");
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-400 animate-pulse">
        Loading transactions…
      </div>
    );
  if (error)
    return (
      <div className="p-6 text-center text-red-400">Error: {error}</div>
    );
  if (!expenses.length)
    return (
      <div className="p-6 text-center text-gray-500">No expenses yet.</div>
    );

  return (
    <div className="bg-gray-950/90 border border-green-400/30 rounded-2xl shadow-lg shadow-green-900/40 p-8 mt-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
        Recent Expenses
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expenses.slice(0,9).map((expense) => (
          <div
            key={expense.id}
            className="bg-gray-900/70 border border-green-400/30 rounded-xl p-5 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-medium text-green-300">
                {expense.description}
              </h3>
              <span className="text-sm text-gray-400">
                {new Date(expense.date).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between mb-1 text-gray-400 text-sm">
              <span>Transaction Type:</span>
              <span className="text-gray-200">
                {expense.transaction_type}
              </span>
            </div>

            <div className="flex justify-between mb-1 text-gray-400 text-sm">
              <span>Payment Method:</span>
              <span className="text-gray-200">
                {expense.payment_method}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Amount:</span>
              <span className="text-green-400 font-semibold">
                ₹{expense.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
