"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

export default function BarChartComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/budgets")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="bg-gray-950 p-4 rounded-lg shadow-lg shadow-green-900/40 w-full border border-green-400/30">
      <h1 className="flex justify-center items-center text-2xl font-semibold mb-3 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">Budget</h1>
      <ResponsiveContainer width="100%" height={300}>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} isAnimationActive={false}/>
        <Legend />
        <Bar dataKey="total_spent" fill="#f87171" name="Spent" />
        <Bar dataKey="budget_amount" fill="#34d399" name="Budget" />
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-2 rounded border border-green-400/40">
        <p className="font-bold">{label}</p>
        <p>Spent: {payload[0].value}</p>
        <p>Budget: {payload[1].value}</p>
      </div>
    );
  }

  return null;
};