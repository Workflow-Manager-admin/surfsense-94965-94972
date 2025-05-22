import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Legend,
  ReferenceLine
} from 'recharts';
import { format, parseISO } from 'date-fns';
import {
  CHART_COLORS,
  FONT_SIZES,
  TOOLTIP_STYLE,
  CHART_CONTAINER_STYLE,
  CHART_MARGINS,
  formatMoodLabel
} from '../../utils/chartUtils';

/**
 * Enhanced chart showing mood trends over time with improved readability and styling
 */
const MoodChart = ({ data }) => {
  // If there's no data
  if (!data || data.length === 0) {
    return (
      <div 
        className="chart-container glass-panel" 
        style={{
          ...CHART_CONTAINER_STYLE.glass,
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      >
        <p className="glow-text" style={{ fontSize: FONT_SIZES.medium }}>
          No mood data available
        </p>
      </div>
    );
  }

  // Format dates for display with improved clarity
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: format(parseISO(item.date), 'MMM d')
  }));

  // Enhanced tooltip formatter for mood data
  const customTooltipFormatter = (value) => {
    return [formatMoodLabel(value), 'Mood Rating'];
  };

  // Custom tick formatter for Y axis to show mood emojis
  const customYAxisTick = ({ x, y, payload }) => {
    const moodEmojis = ['😞', '😐', '🙂', '😊', '🤩'];
    const emoji = moodEmojis[payload.value - 1] || '';
    
    return (
      <g transform={`translate(${x},${y})`}>
        <text 
          x={-10} 
          y={0} 
          dy={4} 
          fontSize={FONT_SIZES.medium} 
          textAnchor="end" 
          fill="var(--text-color)"
        >
          {`${payload.value} ${emoji}`}
        </text>
      </g>
    );
  };

  // Calculate average mood for reference line
  const averageMood = formattedData.reduce((sum, item) => sum + item.mood, 0) / formattedData.length;

  return (
    <div className="chart-container glass-panel" style={CHART_CONTAINER_STYLE.glass}>
      <h3 className="chart-title glow-text" style={{ 
        fontSize: FONT_SIZES.large, 
        marginBottom: '16px',
        fontWeight: '600',
        textAlign: 'center'
      }}>
        Your Mood Trend Over Time
      </h3>
      
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={formattedData}
          margin={CHART_MARGINS.medium}
        >
          <defs>
            <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#1DE9B6" stopOpacity={0.2}/>
            </linearGradient>
            <filter id="glow" height="300%" width="300%" x="-100%" y="-100%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(255,255,255,0.15)" 
            vertical={false}
          />
          
          <XAxis 
            dataKey="formattedDate" 
            stroke="var(--text-color)" 
            tick={{ fill: 'var(--text-color)', fontSize: FONT_SIZES.small }}
            tickMargin={10}
            axisLine={{ stroke: 'var(--text-secondary)' }}
            label={{ 
              value: 'Date', 
              position: 'insideBottomRight', 
              offset: -5, 
              fill: 'var(--text-color)',
              fontSize: FONT_SIZES.small
            }}
          />
          
          <YAxis 
            domain={[1, 5]} 
            ticks={[1, 2, 3, 4, 5]} 
            stroke="var(--text-color)" 
            tick={customYAxisTick}
            tickMargin={10}
            axisLine={{ stroke: 'var(--text-secondary)' }}
            label={{ 
              value: 'Mood Rating', 
              angle: -90, 
              position: 'insideLeft',
              fill: 'var(--text-color)',
              fontSize: FONT_SIZES.small,
              dx: -10
            }}
          />
          
          <Tooltip 
            formatter={customTooltipFormatter}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={TOOLTIP_STYLE.default}
            cursor={{ stroke: 'var(--white)', strokeWidth: 1, strokeDasharray: '3 3' }}
          />
          
          <Legend 
            verticalAlign="top" 
            align="right"
            iconType="circle"
            formatter={() => (
              <span style={{ color: 'var(--text-color)', fontSize: FONT_SIZES.small }}>
                Your Mood
              </span>
            )}
          />
          
          <ReferenceLine 
            y={averageMood} 
            stroke="#FFF8E1" 
            strokeDasharray="3 3"
            strokeWidth={2}
            label={{ 
              value: 'Avg', 
              fill: '#FFF8E1', 
              fontSize: FONT_SIZES.small,
              position: 'right'
            }}
          />

          <Line 
            type="monotone" 
            dataKey="mood" 
            stroke="url(#moodGradient)" 
            strokeWidth={3} 
            dot={{ 
              fill: 'var(--neon-blue)', 
              r: 6, 
              strokeWidth: 2, 
              stroke: 'var(--white)' 
            }}
            activeDot={{ 
              r: 8, 
              fill: 'var(--neon-teal)', 
              stroke: 'var(--white)', 
              strokeWidth: 2,
              filter: 'url(#glow)'
            }}
            animationDuration={1500}
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
