"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

export default function ExpensesForm() {
  const [formData, setFormData] = useState({
    description: "",
    transactionType: "",
    paymentMethod: "",
    amount: "",
  });

  const transactionTypes = ["Misc", "Luxury", "Food", "Transport"];
  const paymentMethods = [
    "Bank Transfer",
    "UPI",
    "Cash",
    "Debit Card",
    "Credit Card",
  ];

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
        toast.success("Expense added!");
        setFormData({
          description: "",
          transactionType: "",
          paymentMethod: "",
          amount: "",
        });
      } else {
        toast.error("Error saving expense");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! ❌", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="mx-auto bg-gray-950/90 border border-green-400/30 rounded-xl shadow-lg shadow-green-900/40 p-8 max-w-6xl">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
        Add Expense
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-6 items-end">
        {/* Description */}
        <div className="flex-1 min-w-[200px]">
          <label className="block mb-2 font-medium text-gray-200">
            Purchase Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g. Lunch at cafe"
            required
            className="w-full rounded-lg bg-gray-900 border border-green-400/40 text-white px-3 py-2 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
          />
        </div>

        {/* Amount */}
        <div className="w-40">
          <label className="block mb-2 font-medium text-gray-200">
            Amount (INR)
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="200"
            required
            className="w-full rounded-lg bg-gray-900 border border-green-400/40 text-white px-3 py-2 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
          />
        </div>

        {/* Transaction Type */}
        <div className="flex-1 min-w-[150px]">
          <label className="block mb-2 font-medium text-gray-200">
            Transaction Type
          </label>
          <select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-gray-900 border border-green-400/40 text-white px-3 py-2 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
          >
            <option value="">Select type</option>
            {transactionTypes.map((type) => (
              <option
                key={type}
                value={type}
                className="bg-gray-800 text-white"
              >
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Method */}
        <div className="flex-1 min-w-[150px]">
          <label className="block mb-2 font-medium text-gray-200">
            Payment Method
          </label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-gray-900 border border-green-400/40 text-white px-3 py-2 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
          >
            <option value="">Select method</option>
            {paymentMethods.map((method) => (
              <option
                key={method}
                value={method}
                className="bg-gray-800 text-white"
              >
                {method}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg border border-green-400/40 text-white bg-gray-900 hover:bg-gray-800 hover:border-green-400 hover:shadow-[0_0_10px_rgba(34,197,94,0.6)] hover:scale-105 transition-all duration-200 font-medium cursor-pointer"
          >
            Add
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
}
