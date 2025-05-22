import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { format, parseISO } from 'date-fns';

/**
 * Chart showing mood trends over time with futuristic styling
 */
const MoodChart = ({ data }) => {
  // If there's no data
  if (!data || data.length === 0) {
    return (
      <div className="chart-container glass-panel" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'rgba(1, 87, 155, 0.7)',
        boxShadow: 'var(--shadow-neon)',
        border: '1px solid var(--border-color)',
        backdropFilter: 'blur(10px)'
      }}>
        <p className="glow-text">No mood data available</p>
      </div>
    );
  }

  // Format dates for display
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: format(parseISO(item.date), 'MMM d')
  }));

  return (
    <div className="chart-container glass-panel" style={{
      background: 'rgba(1, 87, 155, 0.7)',
      boxShadow: 'var(--shadow-neon)',
      border: '1px solid var(--border-color)',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <h3 className="chart-title glow-text">Mood Trend</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#1DE9B6" stopOpacity={0.2}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="formattedDate" 
            stroke="var(--text-color)" 
            tick={{ fill: 'var(--text-color)' }}
          />
          <YAxis 
            domain={[1, 5]} 
            ticks={[1, 2, 3, 4, 5]} 
            stroke="var(--text-color)" 
            tick={{ fill: 'var(--text-color)' }}
          />
          <Tooltip 
            formatter={(value) => [
              `${value} - ${value === 1 ? '😞 Poor' : 
                          value === 2 ? '😐 Fair' : 
                          value === 3 ? '🙂 Good' : 
                          value === 4 ? '😊 Great' : '🤩 Epic'}`, 
              'Mood'
            ]}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{ 
              backgroundColor: 'rgba(13, 71, 161, 0.9)', 
              borderColor: 'var(--neon-blue)', 
              color: 'var(--text-color)', 
              borderRadius: '8px',
              boxShadow: 'var(--shadow-neon)' 
            }}
          />
          <Line 
            type="monotone" 
            dataKey="mood" 
            stroke="url(#moodGradient)" 
            strokeWidth={3} 
            dot={{ fill: 'var(--neon-blue)', r: 6, strokeWidth: 2, stroke: 'var(--white)' }}
            activeDot={{ 
              r: 8, 
              fill: 'var(--neon-teal)', 
              stroke: 'var(--white)', 
              strokeWidth: 2 
            }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Background subtle wave pattern */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '60px',
        background: 'url("../../assets/images/wave-bg.svg")',
        backgroundSize: 'cover',
        opacity: '0.05',
        zIndex: '-1'
      }}></div>
    </div>
  );
};

export default MoodChart;
