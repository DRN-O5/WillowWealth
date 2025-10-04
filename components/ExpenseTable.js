"use client";
import { useEffect, useState } from "react";

export default function ExpensesTable() {
  const [expenses, setExpenses] = useState([]); // should be an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/expenses");
      // if server returned non-2xx, try to read it (text) and log
      if (!res.ok) {
        const text = await res.text();
        console.error("GET /api/expenses failed:", res.status, text);
        setError(`Server error: ${res.status}`);
        setExpenses([]);
        setLoading(false);
        return;
      }

      // parse JSON
      const data = await res.json();

      // handle multiple possible shapes:
      // 1) data is an array -> OK
      // 2) data = { expenses: [...] } -> use data.expenses
      // 3) otherwise -> log and set empty
      if (Array.isArray(data)) {
        setExpenses(data);
      } else if (data && Array.isArray(data.expenses)) {
        setExpenses(data.expenses);
      } else {
        console.error("Unexpected GET /api/expenses response shape:", data);
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

  if (loading) return <div className="p-4">Loading transactions…</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!expenses.length) return <div className="p-4 text-gray-600">No expenses yet.</div>;

  return (
    <div className="overflow-auto text-white">
      <table className="w-full border-collapse mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Description</th>
            <th className="border px-4 py-2 text-left">Transaction Type</th>
            <th className="border px-4 py-2 text-left">Payment Method</th>
            <th className="border px-4 py-2 text-right">Amount (INR)</th>
            <th className="border px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="border px-4 py-2">{expense.description}</td>
              <td className="border px-4 py-2">{expense.transaction_type}</td>
              <td className="border px-4 py-2">{expense.payment_method}</td>
              <td className="border px-4 py-2 text-right">{expense.amount}</td>
              <td className="border px-4 py-2">{new Date(expense.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
