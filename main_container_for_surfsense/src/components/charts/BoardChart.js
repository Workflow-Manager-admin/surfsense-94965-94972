import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

/**
 * Chart showing board usage percentages
 */
const BoardChart = ({ data }) => {
  // Colors for the pie chart segments
  const COLORS = ['#0277BD', '#58B0D8', '#00838F', '#4DD0E1', '#80DEEA', '#01579B', '#039BE5'];

  // If there's no data
  if (!data || data.length === 0) {
    return (
      <div className="chart-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>No board data available</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3 className="chart-title">Board Usage</h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="percentage"
            nameKey="name"
            label={({ name, percentage }) => `${name}: ${percentage}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value}%`, 'Usage']}
            contentStyle={{ backgroundColor: '#fff', borderColor: 'var(--border-color)' }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BoardChart;
