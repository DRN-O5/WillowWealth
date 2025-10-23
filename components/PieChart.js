import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

const COLORS = ['#0a51ad', '#32a8a2', '#d11919', '#f9c74f', '#90be6d'];

const PieChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/stats");
      const { pieData } = await res.json();
      setData(pieData);
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-gray-950 p-4 rounded-lg shadow-lg shadow-green-900/40 border border-green-400/30 w-full">
      <h1 className='flex justify-center items-center text-2xl font-semibold mb-3 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent'>Payment</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} isAnimationActive={false} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-2 rounded border border-green-400/40">
        <h2 className="font-bold text-white">{payload[0].name}</h2>
        <p>INR: {payload[0].value}</p>
      </div>
    );
  }

  return null;
};

export default PieChartComponent;
