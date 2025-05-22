import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

/**
 * Chart showing mood trends over time
 */
const MoodChart = ({ data }) => {
  // If there's no data
  if (!data || data.length === 0) {
    return (
      <div className="chart-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>No mood data available</p>
      </div>
    );
  }

  // Format dates for display
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: format(parseISO(item.date), 'MMM d')
  }));

  return (
    <div className="chart-container">
      <h3 className="chart-title">Mood Trend</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="formattedDate" />
          <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
          <Tooltip 
            formatter={(value) => [
              `${value} - ${value === 1 ? '😞 Poor' : 
                          value === 2 ? '😐 Fair' : 
                          value === 3 ? '🙂 Good' : 
                          value === 4 ? '😊 Great' : '🤩 Epic'}`, 
              'Mood'
            ]}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{ backgroundColor: '#fff', borderColor: 'var(--border-color)' }}
          />
          <Line 
            type="monotone" 
            dataKey="mood" 
            stroke="var(--teal)" 
            strokeWidth={2} 
            dot={{ fill: 'var(--teal)', r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodChart;
