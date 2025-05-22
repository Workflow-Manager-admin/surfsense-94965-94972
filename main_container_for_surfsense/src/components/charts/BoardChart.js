import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Label
} from 'recharts';
import {
  CHART_COLORS,
  FONT_SIZES,
  TOOLTIP_STYLE,
  CHART_CONTAINER_STYLE
} from '../../utils/chartUtils';

/**
 * Chart showing board usage percentages with enhanced visual appeal and readability
 */
const BoardChart = ({ data }) => {
  // If there's no data
  if (!data || data.length === 0) {
    return (
      <div 
        className="chart-container" 
        style={{
          ...CHART_CONTAINER_STYLE.default,
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      >
        <p style={{ color: 'var(--dark-blue)', fontSize: FONT_SIZES.medium }}>
          No board data available
        </p>
      </div>
    );
  }

  // Custom renderer for pie chart labels to prevent overlapping
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180;
    // Position label farther from the pie to avoid overlapping
    const radius = outerRadius * 1.15;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    // Only show label for segments with significant percentage
    if (percent < 0.05) return null;
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="#01579B"
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={FONT_SIZES.small}
        fontWeight="500"
      >
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  // Enhanced tooltip formatter
  const tooltipFormatter = (value, name, props) => {
    return [
      `${value}%`,
      `Board: ${props.payload.name}`
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
        Board Usage Distribution
      </h3>
      
      <ResponsiveContainer width="100%" height="85%">
        <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            labelLine={false}
            outerRadius={90} // Increased radius for better visibility
            innerRadius={30} // Added inner radius for donut-style chart
            fill="#8884d8"
            dataKey="percentage"
            nameKey="name"
            label={renderCustomizedLabel}
            paddingAngle={2} // Added padding between segments
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={CHART_COLORS.pie[index % CHART_COLORS.pie.length]} 
                stroke="rgba(255,255,255,0.5)"
                strokeWidth={1}
              />
            ))}
            <Label
              value="Board Types"
              position="center"
              fill="var(--dark-blue)"
              style={{ fontSize: FONT_SIZES.medium, fontWeight: 'bold' }}
            />
          </Pie>
          <Tooltip 
            formatter={tooltipFormatter}
            contentStyle={TOOLTIP_STYLE.light}
            cursor={false}
          />
          <Legend 
            verticalAlign="bottom" 
            align="center" 
            layout="horizontal"
            iconSize={14}
            iconType="circle"
            formatter={(value) => (
              <span style={{ color: 'var(--dark-blue)', fontSize: FONT_SIZES.small, fontWeight: 500 }}>
                {value}
              </span>
            )}
            wrapperStyle={{ paddingTop: '15px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BoardChart;
