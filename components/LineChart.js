import React from "react";
import { useState, useEffect } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/stats");
      const { lineData } = await res.json();
      setData(lineData);
    };
    fetchStats();
  }, []);
  
  return (
    <div className="bg-gray-950 p-4 rounded-lg shadow-lg shadow-green-900/40 w-[69.45vw] border border-green-400/30">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} isAnimationActive={false} />
          <Legend />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-2 rounded border border-green-400/30">
        <p className="font-bold">{label}</p>
        <p>Transaction: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default LineChartComponent;