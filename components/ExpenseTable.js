"use client";
import { useEffect, useState } from "react";

export default function ExpensesTable() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await fetch("/api/expenses");
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <table className="w-full border-collapse mt-6">
      <thead>
        <tr>
          <th className="border px-4 py-2">Description</th>
          <th className="border px-4 py-2">Transaction Type</th>
          <th className="border px-4 py-2">Payment Method</th>
          <th className="border px-4 py-2">Amount (INR)</th>
          <th className="border px-4 py-2">Date</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td className="border px-4 py-2">{expense.description}</td>
            <td className="border px-4 py-2">{expense.transaction_type}</td>
            <td className="border px-4 py-2">{expense.payment_method}</td>
            <td className="border px-4 py-2">{expense.amount}</td>
            <td className="border px-4 py-2">{new Date(expense.date).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
