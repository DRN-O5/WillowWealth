import React, { useEffect } from "react";
import { useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const AreaChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/stats", { cache: "no-store" });
      const { areaData } = await res.json();
      setData(areaData);
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-gray-950 p-4 rounded-lg shadow-lg shadow-green-900/40 w-[600px] border border-green-400/30">
        <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid stroke="#8884d8" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip content={<CustomTooltip />} isAnimationActive={false} />
          <Legend />
          <Area dataKey="total" fill="#0a51ad" stackId="1" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-2 rounded border border-green-400/40">
        <p className="font-bold">{label}</p>
        <p>Transaction: {payload[0].value}</p>
      </div>
    );
  }

  return null;
};

export default AreaChartComponent;
