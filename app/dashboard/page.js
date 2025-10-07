"use client";

import React from "react";
import { useState } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpensesTable from "@/components/ExpenseTable";
import { useSession } from "next-auth/react";
import ProfileTab from "@/components/ProfileTab";
import AreaChartComponent from "@/components/AreaChart";
import PieChartComponent from "@/components/PieChart";
import LineChartComponent from "@/components/LineChart";
import StatementTable from "@/components/StatementTable";

const dashboard = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("dashboard");
  const isLoading = status === "loading";

  if (isLoading) {
    return <div className="text-gray-400 text-center p-4">Loading...</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="min-h-screen bg-gray-950 text-white p-8 space-y-12 rounded">
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-green-400 text-center">
              Dashboard
            </h1>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="flex justify-center">
                <AreaChartComponent />
              </div>
              <div className="flex justify-end w-auto">
                <PieChartComponent />
              </div>
              <div className="lg:col-span-2 flex justify-center">
                <LineChartComponent />
              </div>
            </div>

            {/* Table Section */}
            <div className="pt-6">
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
          </div>
        );
      case "statement":
        return (
          <div>
            <div>
              <StatementTable />
            </div>
          </div>
        );
      case "profile":
        return (
          <div>
            <ProfileTab />
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return session ? (
    <div className="mt-18">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-1/5 bg-gray-900 border-r border-gray-700 p-6 flex flex-col text-white">
          <h2 className="text-xl font-bold mb-6 ml-4">Menu</h2>
          <ul className="flex flex-col space-y-4">
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded duration-100 ${
                  activeTab === "dashboard"
                    ? "bg-gray-950"
                    : "hover:bg-gray-950"
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded duration-100 ${
                  activeTab === "expenses" ? "bg-gray-950" : "hover:bg-gray-950"
                }`}
                onClick={() => setActiveTab("expenses")}
              >
                Expenses
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded duration-100 ${
                  activeTab === "statement"
                    ? "bg-gray-950"
                    : "hover:bg-gray-950"
                }`}
                onClick={() => setActiveTab("statement")}
              >
                Statement
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded duration-100 ${
                  activeTab === "profile" ? "bg-gray-950" : "hover:bg-gray-950"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
            </li>
          </ul>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 bg-black">{renderContent()}</div>
      </div>
    </div>
  ) : null;
};

export default dashboard;
