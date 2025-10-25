"use client";

import React from "react";
import { useState } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpensesTable from "@/components/ExpenseTable";
import { signOut, useSession } from "next-auth/react";
import ProfileTab from "@/components/ProfileTab";
import AreaChartComponent from "@/components/AreaChart";
import PieChartComponent from "@/components/PieChart";
import LineChartComponent from "@/components/LineChart";
import StatementTable from "@/components/StatementTable";
import BarChartComponent from "@/components/BarChart";
import BudgetForm from "@/components/BudgetForm";
import AlertsList from "@/components/AlertsList";

const Dashboard = () => {
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
          <div className=" bg-gray-950 text-white p-8 space-y-12 rounded min-h-full">
            <h1 className="text-3xl font-bold text-green-400 text-center">
              Dashboard
            </h1>

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
              
              <div>
                <BarChartComponent />
              </div>
              <div>
                <AlertsList userId={session?.user?.id}/>
              </div>
            </div>

            <div className="pt-6">
              <ExpensesTable />
            </div>
          </div>
        );
      case "manage":
        return (
          <div>
            <div>
              <ExpenseForm />
            </div>
            <div className="mt-5">
              <BudgetForm />
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
    <div>
      <div className="flex mt-18 h-[calc(100vh-4.5rem)]">
        {/* Sidebar */}
        <div className="w-1/6 bg-gray-950 border-r border-gray-800 px-2 py-5 flex flex-col text-white sticky top-18 overflow-y-auto h-full custom-scrollbar">
          <h2 className="text-xl font-bold mb-6 ml-4">Menu</h2>
          <ul className="flex flex-col space-y-4">
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded duration-100 ${
                  activeTab === "dashboard"
                    ? "bg-black border border-green-400/40 text-green-400 hover:bg-gray-800 hover:border-green-400"
                    : "border-green-400/40 text-white bg-gray-950 hover:bg-gray-800 hover:border-green-400 hover:text-green-400"
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded duration-100 ${
                  activeTab === "manage"
                    ? "bg-black border border-green-400/40 text-green-400 hover:bg-gray-800 hover:border-green-400"
                    : "border-green-400/40 text-white bg-gray-950 hover:bg-gray-800 hover:border-green-400 hover:text-green-400"
                }`}
                onClick={() => setActiveTab("manage")}
              >
                Manage
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded duration-100 ${
                  activeTab === "statement"
                    ? "bg-black border border-green-400/40 text-green-400 hover:bg-gray-800 hover:border-green-400"
                    : "border-green-400/40 text-white bg-gray-950 hover:bg-gray-800 hover:border-green-400 hover:text-green-400"
                }`}
                onClick={() => setActiveTab("statement")}
              >
                Statement
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded duration-100 ${
                  activeTab === "profile"
                    ? "bg-black border border-green-400/40 text-green-400 hover:bg-gray-800 hover:border-green-400"
                    : "border-green-400/40 text-white bg-gray-950 hover:bg-gray-800 hover:border-green-400 hover:text-green-400"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 rounded duration-100 border-green-400/40 text-white bg-gray-950 hover:bg-gray-800 hover:border-green-400 hover:text-red-400"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 bg-black overflow-y-auto h-full custom-scrollbar">
          {renderContent()}
        </div>
      </div>
    </div>
  ) : null;
};

export default Dashboard;
