import React from "react";
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

const data = [
  { name: "January", uv: 4000, pv: 2400, amt: 2400 },
  { name: "February", uv: 3000, pv: 1398, amt: 2210 },
  { name: "March", uv: 2000, pv: 9800, amt: 2290 },
  { name: "April", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "June", uv: 2390, pv: 3800, amt: 2500 },
  { name: "July", uv: 3490, pv: 4300, amt: 2100 },
];

const AreaChartComponent = () => {
  return (
    <div className="bg-gray-950 p-4 rounded-lg shadow-lg shadow-green-900/40 w-[500px] border border-green-400/30">
        <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid stroke="#8884d8" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip content={<CustomTooltip />} isAnimationActive={false} />
          <Legend />
          <Area dataKey="uv" fill="#0a51ad" stackId="1" />
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
        <p>UV: {payload[0].value}</p>
      </div>
    );
  }

  return null;
};

export default AreaChartComponent;
