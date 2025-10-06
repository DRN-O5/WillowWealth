"use client"

import React from "react";
import { useState } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpensesTable from "@/components/ExpenseTable";
import { useSession } from "next-auth/react";
import ProfileTab from "@/components/ProfileTab";
import { Area } from "recharts";
import AreaChartComponent from "@/components/AreaChart";
import PieChartComponent from "@/components/PieChart";
import LineChartComponent from "@/components/LineChart";

const dashboard = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div>
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-6 text-green-400">Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AreaChartComponent />
                <PieChartComponent />
                <LineChartComponent />
              </div>
              <div>
                <ExpensesTable />
              </div>
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
      case "profile":
        return <div><ProfileTab /></div>;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    session ? (
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
    ) : null
  );
};

export default dashboard;
