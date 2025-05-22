import React, { useState, useEffect, useRef } from 'react';
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
  CHART_CONTAINER_STYLE,
  CHART_MARGINS,
  truncateText
} from '../../utils/chartUtils';

/**
 * Chart showing board usage percentages with enhanced visual appeal and readability
 */
const BoardChart = ({ data }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Monitor container size changes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    
    // Initial measurement
    updateDimensions();
    
    // Set up resize listener
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

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
        ref={containerRef}
      >
        <p style={{ color: 'var(--dark-blue)', fontSize: FONT_SIZES.medium }}>
          No board data available
        </p>
      </div>
    );
  }

  // Process data to ensure labels don't overlap
  const processedData = data.map(item => ({
    ...item,
    // Use shortened name for very small screens
    displayName: containerWidth < 400 ? truncateText(item.name, 8, containerWidth) : item.name
  })).sort((a, b) => b.percentage - a.percentage); // Sort by percentage to improve layout

  // Custom renderer for pie chart labels to prevent overlapping
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180;
    
    // Dynamically adjust label position based on container size
    const radius = containerWidth < 350 ? outerRadius * 1.05 : 
                  containerWidth < 500 ? outerRadius * 1.1 : outerRadius * 1.15;
    
    // Calculate position
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    // Skip small segments based on container size
    const minPercent = containerWidth < 400 ? 0.08 : 
                      containerWidth < 600 ? 0.06 : 0.05;
    
    if (percent < minPercent) return null;
    
    // Adjust font size based on container width
    const fontSize = containerWidth < 400 ? 
                    FONT_SIZES.xsmall : 
                    containerWidth < 600 ? 
                    FONT_SIZES.small : FONT_SIZES.small;
    
    // For smaller screens, show only percentage
    const labelText = containerWidth < 350 ? 
                    `${(percent * 100).toFixed(0)}%` : 
                    `${processedData[index].displayName} (${(percent * 100).toFixed(0)}%)`;
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="#01579B"
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={fontSize}
        fontWeight="500"
      >
        {labelText}
      </text>
    );
  };

  // Enhanced tooltip formatter to show full info (especially for segments without labels)
  const tooltipFormatter = (value, name, props) => {
    const boardName = props.payload.name;
    return [
      `${value}%`,
      `Board: ${boardName}`
    ];
  };

  // Calculate optimal chart dimensions based on container size
  const chartSize = {
    outerRadius: containerWidth < 350 ? 70 : 
                containerWidth < 500 ? 80 : 90,
    innerRadius: containerWidth < 350 ? 25 :
                containerWidth < 500 ? 28 : 30
  };

  return (
    <div 
      className="chart-container glass-panel" 
      style={CHART_CONTAINER_STYLE.default}
      ref={containerRef}
    >
      <h3 className="chart-title" style={{ 
        fontSize: FONT_SIZES.getResponsive(FONT_SIZES.large, containerWidth), 
        color: 'var(--dark-blue)',
        marginBottom: '16px',
        fontWeight: '600',
        textAlign: 'center'
      }}>
        Board Usage Distribution
      </h3>
      
      <ResponsiveContainer width="100%" height="85%">
        <PieChart 
          margin={CHART_MARGINS.getResponsive(
            { top: 20, right: 20, bottom: 20, left: 20 },
            containerWidth
          )}
        >
          <Pie
            data={processedData}
            cx="50%"
            cy="45%"
            labelLine={false}
            outerRadius={chartSize.outerRadius}
            innerRadius={chartSize.innerRadius}
            fill="#8884d8"
            dataKey="percentage"
            nameKey="displayName"
            label={renderCustomizedLabel}
            paddingAngle={containerWidth < 350 ? 1 : 2}
          >
            {processedData.map((entry, index) => (
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
              style={{ 
                fontSize: FONT_SIZES.getResponsive(FONT_SIZES.medium, containerWidth),
                fontWeight: 'bold' 
              }}
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
            layout={containerWidth < 400 ? "vertical" : "horizontal"}
            iconSize={containerWidth < 350 ? 10 : 14}
            iconType="circle"
            formatter={(value) => (
              <span style={{ 
                color: 'var(--dark-blue)', 
                fontSize: FONT_SIZES.getResponsive(FONT_SIZES.small, containerWidth),
                fontWeight: 500 
              }}>
                {truncateText(value, containerWidth < 400 ? 10 : 20, containerWidth)}
              </span>
            )}
            wrapperStyle={{ 
              paddingTop: containerWidth < 400 ? '5px' : '15px',
              maxWidth: '100%' 
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BoardChart;
