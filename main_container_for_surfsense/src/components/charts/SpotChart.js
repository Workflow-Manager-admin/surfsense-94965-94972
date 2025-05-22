import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Chart showing most visited surf spots
 */
const SpotChart = ({ data }) => {
  // If there's no data or only a few items
  if (!data || data.length === 0) {
    return (
      <div className="chart-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>No spot data available</p>
      </div>
    );
  }

  // Limit to top 5 spots if there are many
  const chartData = data.slice(0, 5);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Most Visited Spots</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" fontSize={12} />
          <YAxis allowDecimals={false} />
          <Tooltip 
            formatter={(value) => [`${value} sessions`, 'Sessions']}
            contentStyle={{ backgroundColor: '#fff', borderColor: 'var(--border-color)' }}
          />
          <Bar dataKey="count" fill="var(--primary-blue)" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpotChart;
