"use client"; 
import React from "react";

export default function BenefitContainer() {
  const benefits = [
    {
      title: "Track Expenses Easily",
      desc: "Log and categorize all your daily expenses with just a few clicks, ensuring you stay in control of your money.",
    },
    {
      title: "Visualize Spending",
      desc: "Get clear graphs and charts to quickly see where your money is going and identify spending patterns.",
    },
    {
      title: "Smart Budgeting",
      desc: "Set custom budgets and receive insights when you’re close to exceeding them.",
    },
    {
      title: "Secure & Private",
      desc: "Your financial data is encrypted and stored securely, keeping your information safe.",
    },
  ];

  return (
    <section className="w-full bg-gray-950 text-white cursor-default py-16 px-6 md:px-12 lg:px-20 border border-green-400/20 rounded-md shadow-lg shadow-green-900/40">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl p-3 md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
          Why Use WillowWealth?
        </h2>
        <p className="mt-4 text-gray-400 text-lg">
          Manage your finances smarter with these powerful features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-green-400/30 bg-gray-900/60 hover:bg-gray-800 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-200"
          >
            <h3 className="text-xl font-semibold text-green-300 mb-3">
              {item.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
