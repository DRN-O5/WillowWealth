"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const BudgetForm = () => {
  const [formData, setFormData] = useState({
    Essentials: "",
    Misc: "",
    Food: "",
    Luxury: "",
    Transport: "",
  });

  // Load saved budgets
  useEffect(() => {
    const saved = localStorage.getItem("budgetData");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  const handleChange = (name, value) => {
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    localStorage.setItem("budgetData", JSON.stringify(updated));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const [category, budget_amount] of Object.entries(formData)) {
        if (!budget_amount) continue;
        await fetch("/api/budgets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category,
            budget_amount: parseFloat(budget_amount),
          }),
        });
      }
      toast.success("Budget saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save budget");
    }
  };

  return (
    <div className="mx-auto bg-gray-950/90 border border-green-400/30 rounded-xl shadow-lg shadow-green-900/40 p-8 w-4xl md:w-full">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
        Set Budget
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-gray-200 mb-1">{key}:</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={formData[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className="rounded-lg bg-gray-900 border border-green-400/40 text-white px-3 py-2 
                         focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 
                         transition-all w-full"
            />
          </div>
        ))}

        <div className="col-span-full flex justify-end mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-green-400 hover:bg-green-300 text-gray-900 rounded-lg font-semibold transition-all"
          >
            Save Budget
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
};

export default BudgetForm;
