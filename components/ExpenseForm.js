"use client";
import { useState } from "react";

export default function ExpensesForm() {
  const [formData, setFormData] = useState({
    description: "",
    transactionType: "",
    paymentMethod: "",
    amount: "",
  });

  const transactionTypes = ["Misc", "Luxury", "Food", "Transport"];
  const paymentMethods = ["Bank Transfer", "UPI", "Cash", "Debit Card", "Credit Card"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Expense saved!");
        setFormData({ description: "", transactionType: "", paymentMethod: "", amount: "" });
      } else {
        alert("Error saving expense");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-xl shadow-md max-w-6xl">
      <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 items-end"
      >
        {/* Description */}
        <div className="flex-1 min-w-[200px]">
          <label className="block mb-1 font-medium">Purchase Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Lunch at cafe"
            required
          />
        </div>

        {/* Amount */}
        <div className="w-32">
          <label className="block mb-1 font-medium">Amount (INR)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="200"
            required
          />
        </div>

        {/* Transaction Type */}
        <div className="flex-1 min-w-[150px]">
          <label className="block mb-1 font-medium">Transaction Type</label>
          <select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select type</option>
            {transactionTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Payment Method */}
        <div className="flex-1 min-w-[150px]">
          <label className="block mb-1 font-medium">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select method</option>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
