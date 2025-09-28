"use client"; // Required for React state in Next.js 13+ app directory
import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpensesTable from "@/components/ExpenseTable";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div>
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

              {/* Expenses Table */}
              <ExpensesTable />
            </div>
          </div>
        );
      case "expenses":
        return (
          <div>
            <div>
              <ExpenseForm />
            </div>

            <div className="p-6">
              <h1 className="text-xl font-bold mb-6">Dashboard</h1>

              {/* Expenses Table */}
              <ExpensesTable />
            </div>
          </div>
        );
      case "profile":
        return <div>Profile Content</div>;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 border-r border-gray-300 p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <ul className="flex flex-col space-y-4">
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded duration-100 ${
                activeTab === "dashboard" ? "bg-gray-200" : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded duration-100 ${
                activeTab === "expenses" ? "bg-gray-200" : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("expenses")}
            >
              Expenses
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded duration-100 ${
                activeTab === "profile" ? "bg-gray-200" : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8">{renderContent()}</div>
    </div>
  );
}
