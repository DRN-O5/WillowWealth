import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Bank Transfer', value: 400 },
  { name: 'UPI', value: 300 },
  { name: 'Cash', value: 300 },
  { name: 'Debit Card', value: 200 },
  { name: 'Credit Card', value: 200 },
];

// "Bank Transfer",
//     "UPI",
//     "Cash",
//     "Debit Card",
//     "Credit Card",

const COLORS = ['#0a51ad', '#32a8a2', '#d11919', '#f9c74f', '#90be6d'];

const PieChartComponent = () => {
  return (
    <div className="bg-gray-950 p-4 rounded-lg shadow-lg shadow-green-900/40 border border-green-400/30 w-[500px]">
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
        <p>Value: {payload[0].value}</p>
      </div>
    );
  }

  return null;
};

export default PieChartComponent;
