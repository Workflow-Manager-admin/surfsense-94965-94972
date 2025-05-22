import React, { useState, useEffect, useRef } from 'react';
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
  calculateBarSize,
  shouldRotateLabels,
  getLabelRotation,
  getTickInterval,
  shouldShowLabels
} from '../../utils/chartUtils';

/**
 * Enhanced chart showing most visited surf spots with improved visuals and readability
 */
const SpotChart = ({ data }) => {
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
        ref={containerRef}
      >
        <p style={{ color: 'var(--dark-blue)', fontSize: FONT_SIZES.medium }}>
          No spot data available
        </p>
      </div>
    );
  }

  // Determine how many spots to show based on container width
  const spotLimit = containerWidth < 350 ? 4 : 
                   containerWidth < 500 ? 6 : 8;

  // Limit spots and format the data
  const chartData = data.slice(0, spotLimit).map(item => ({
    ...item,
    // Add shortened name for display on axis with dynamic truncation
    displayName: truncateText(item.name, 
                  containerWidth < 350 ? 6 :
                  containerWidth < 500 ? 8 : 10, 
                  containerWidth)
  }));

  // Calculate dynamic bar size based on number of items and container width
  const barSize = calculateBarSize(chartData.length, containerWidth);

  // Determine if labels should be rotated
  const rotateLabels = shouldRotateLabels(chartData.length, containerWidth);
  
  // Calculate optimal rotation angle
  const rotationAngle = getLabelRotation(
    chartData.length > 0 ? chartData[0].name.length : 10,
    containerWidth
  );

  // Determine tick interval (skip some ticks if many data points)
  const tickInterval = getTickInterval(chartData.length, containerWidth);

  // Custom X axis tick with rotation support
  const CustomXAxisTick = ({ x, y, payload }) => {
    const labelFontSize = FONT_SIZES.getResponsive(FONT_SIZES.small, containerWidth);
    
    return (
      <g transform={`translate(${x},${y})`}>
        <text 
          x={0} 
          y={0} 
          dy={rotateLabels ? 5 : 16} 
          dx={rotateLabels ? -5 : 0}
          textAnchor={rotateLabels ? "end" : "middle"}
          transform={rotateLabels ? `rotate(${rotationAngle})` : undefined}
          fill="#01579B"
          fontSize={labelFontSize}
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

  // Calculate margins based on rotation and data length
  const margins = CHART_MARGINS.getResponsive(
    CHART_MARGINS.large,
    containerWidth,
    chartData.length
  );
  
  // If labels are rotated, increase bottom margin
  if (rotateLabels) {
    margins.bottom += 15;
  }

  // Should we show data value labels on bars?
  const showDataLabels = shouldShowLabels(chartData.length, containerWidth, barSize);

  return (
    <div 
      className="chart-container glass-panel" 
      style={CHART_CONTAINER_STYLE.default}
      ref={containerRef}
    >
      <h3 className="chart-title" style={{ 
        fontSize: FONT_SIZES.getResponsive(FONT_SIZES.large, containerWidth), 
        color: 'var(--dark-blue)',
        marginBottom: containerWidth < 400 ? '10px' : '16px',
        fontWeight: '600',
        textAlign: 'center'
      }}>
        Most Visited Surf Spots
      </h3>
      
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={chartData}
          margin={margins}
          barCategoryGap={containerWidth < 500 ? "10%" : "15%"}
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
            interval={tickInterval}
            height={rotateLabels ? 60 : 40}
            tickMargin={rotateLabels ? 15 : 10}
            axisLine={{ stroke: '#01579B' }}
            label={{ 
              value: 'Surf Location', 
              position: 'insideBottom', 
              offset: rotateLabels ? -2 : -5,
              fill: '#01579B',
              fontSize: FONT_SIZES.getResponsive(FONT_SIZES.small, containerWidth),
              fontWeight: 500
            }}
          />
          
          <YAxis 
            allowDecimals={false} 
            axisLine={{ stroke: '#01579B' }}
            tickLine={{ stroke: '#01579B' }}
            tick={{ 
              fontSize: FONT_SIZES.getResponsive(FONT_SIZES.small, containerWidth), 
              fill: '#01579B' 
            }}
            tickMargin={10}
            label={{ 
              value: 'Number of Sessions', 
              angle: -90, 
              position: 'insideLeft',
              fill: '#01579B',
              fontSize: FONT_SIZES.getResponsive(FONT_SIZES.small, containerWidth),
              dx: containerWidth < 400 ? -10 : -15
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
              <span style={{ 
                color: 'var(--dark-blue)', 
                fontSize: FONT_SIZES.getResponsive(FONT_SIZES.small, containerWidth) 
              }}>
                Sessions
              </span>
            )}
            wrapperStyle={{
              paddingTop: containerWidth < 400 ? '5px' : '10px'
            }}
          />
          
          <Bar 
            dataKey="count" 
            fill="url(#barGradient)" 
            barSize={barSize}
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          >
            {showDataLabels && (
              <LabelList 
                dataKey="count" 
                position="top" 
                fill="#01579B" 
                fontSize={FONT_SIZES.getResponsive(FONT_SIZES.small, containerWidth)}
                formatter={(value) => value > 0 ? value : ''}
              />
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpotChart;
