import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  LabelList
} from 'recharts';
import {
  CHART_COLORS,
  FONT_SIZES,
  TOOLTIP_STYLE,
  CHART_CONTAINER_STYLE,
  CHART_MARGINS,
  truncateText,
  calculateBarSize
} from '../../utils/chartUtils';

/**
 * Enhanced chart showing most visited surf spots with improved visuals and readability
 */
const SpotChart = ({ data }) => {
  // If there's no data or only a few items
  if (!data || data.length === 0) {
    return (
      <div 
        className="chart-container glass-panel" 
        style={{
          ...CHART_CONTAINER_STYLE.default,
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      >
        <p style={{ color: 'var(--dark-blue)', fontSize: FONT_SIZES.medium }}>
          No spot data available
        </p>
      </div>
    );
  }

  // Limit to top 8 spots if there are many, and format the data
  const chartData = data.slice(0, 8).map(item => ({
    ...item,
    // Add shortened name for display on axis 
    displayName: truncateText(item.name, 10)
  }));

  // Calculate dynamic bar size based on number of items
  const barSize = calculateBarSize(chartData.length);

  // Custom X axis tick to handle long names
  const CustomXAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text 
          x={0} 
          y={0} 
          dy={16} 
          textAnchor="middle" 
          fill="#01579B"
          fontSize={FONT_SIZES.small}
          fontWeight="500"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  // Custom tooltip formatter
  const tooltipFormatter = (value, name, props) => {
    return [
      `${value} sessions`,
      `Location: ${props.payload.name}`
    ];
  };

  return (
    <div className="chart-container glass-panel" style={CHART_CONTAINER_STYLE.default}>
      <h3 className="chart-title" style={{ 
        fontSize: FONT_SIZES.large, 
        color: 'var(--dark-blue)',
        marginBottom: '16px',
        fontWeight: '600',
        textAlign: 'center'
      }}>
        Most Visited Surf Spots
      </h3>
      
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={chartData}
          margin={CHART_MARGINS.large}
          barCategoryGap="15%"
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0288D1" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#03A9F4" stopOpacity={0.8}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="rgba(0,0,0,0.1)" 
          />
          
          <XAxis 
            dataKey="displayName" 
            tick={CustomXAxisTick}
            interval={0}
            tickMargin={10}
            axisLine={{ stroke: '#01579B' }}
            label={{ 
              value: 'Surf Location', 
              position: 'insideBottom', 
              offset: -5,
              fill: '#01579B',
              fontSize: FONT_SIZES.small,
              fontWeight: 500
            }}
          />
          
          <YAxis 
            allowDecimals={false} 
            axisLine={{ stroke: '#01579B' }}
            tickLine={{ stroke: '#01579B' }}
            tick={{ fontSize: FONT_SIZES.small, fill: '#01579B' }}
            tickMargin={10}
            label={{ 
              value: 'Number of Sessions', 
              angle: -90, 
              position: 'insideLeft',
              fill: '#01579B',
              fontSize: FONT_SIZES.small,
              dx: -15
            }}
          />
          
          <Tooltip 
            formatter={tooltipFormatter}
            contentStyle={TOOLTIP_STYLE.light}
            cursor={{ fill: 'rgba(2, 136, 209, 0.1)' }}
          />
          
          <Legend
            iconType="circle"
            formatter={() => (
              <span style={{ color: 'var(--dark-blue)', fontSize: FONT_SIZES.small }}>
                Sessions
              </span>
            )}
          />
          
          <Bar 
            dataKey="count" 
            fill="url(#barGradient)" 
            barSize={barSize}
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          >
            <LabelList 
              dataKey="count" 
              position="top" 
              fill="#01579B" 
              fontSize={FONT_SIZES.small}
              formatter={(value) => value > 0 ? value : ''}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpotChart;
