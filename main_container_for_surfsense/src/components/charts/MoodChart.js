import React, { useState, useEffect, useRef } from 'react';
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
  formatMoodLabel,
  getTickInterval,
  shouldRotateLabels
} from '../../utils/chartUtils';

/**
 * Enhanced chart showing mood trends over time with improved readability and styling
 */
const MoodChart = ({ data }) => {
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
        className="chart-container glass-panel" 
        style={{
          ...CHART_CONTAINER_STYLE.glass,
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center'
        }}
        ref={containerRef}
      >
        <p className="glow-text" style={{ fontSize: FONT_SIZES.medium }}>
          No mood data available
        </p>
      </div>
    );
  }

  // Format dates for display with improved clarity
  // Use different format based on container width
  const dateFormat = containerWidth < 400 ? 'M/d' : 'MMM d';
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: format(parseISO(item.date), dateFormat)
  }));

  // Determine tick interval (skip some ticks if many data points)
  const tickInterval = getTickInterval(formattedData.length, containerWidth);
  
  // Determine if x-axis labels should be rotated
  const rotateLabels = shouldRotateLabels(formattedData.length, containerWidth);

  // Enhanced tooltip formatter for mood data
  const customTooltipFormatter = (value) => {
    return [formatMoodLabel(value), 'Mood Rating'];
  };

  // Custom tick formatter for Y axis to show mood emojis
  const customYAxisTick = ({ x, y, payload }) => {
    const moodEmojis = ['😞', '😐', '🙂', '😊', '🤩'];
    const emoji = moodEmojis[payload.value - 1] || '';
    
    // Adjust emoji display based on container width
    const showEmoji = containerWidth < 350 ? false : true;
    const fontSize = FONT_SIZES.getResponsive(FONT_SIZES.medium, containerWidth);
    
    return (
      <g transform={`translate(${x},${y})`}>
        <text 
          x={containerWidth < 350 ? -5 : -10} 
          y={0} 
          dy={4} 
          fontSize={fontSize} 
          textAnchor="end" 
          fill="var(--text-color)"
        >
          {showEmoji ? `${payload.value} ${emoji}` : `${payload.value}`}
        </text>
      </g>
    );
  };
  
  // Custom X axis tick with optional rotation
  const customXAxisTick = ({ x, y, payload }) => {
    if (!rotateLabels) return null; // Use default if not rotating
    
    return (
      <g transform={`translate(${x},${y})`}>
        <text 
          x={0} 
          y={0} 
          dy={5} 
          dx={-5}
          textAnchor="end"
          transform="rotate(-30)"
          fill="var(--text-color)"
          fontSize={FONT_SIZES.getResponsive(FONT_SIZES.small, containerWidth)}
        >
          {payload.value}
        </text>
      </g>
    );
  };

  // Calculate average mood for reference line
  const averageMood = formattedData.reduce((sum, item) => sum + item.mood, 0) / formattedData.length;
  
  // Calculate responsive margins based on container size
  const margins = CHART_MARGINS.getResponsive(
    CHART_MARGINS.medium,
    containerWidth,
    formattedData.length
  );
  
  // If labels are rotated, increase bottom margin
  if (rotateLabels) {
    margins.bottom += 10;
  }

  return (
    <div 
      className="chart-container glass-panel" 
      style={CHART_CONTAINER_STYLE.glass}
      ref={containerRef}
    >
      <h3 className="chart-title glow-text" style={{ 
        fontSize: FONT_SIZES.getResponsive(FONT_SIZES.large, containerWidth), 
        marginBottom: containerWidth < 400 ? '10px' : '16px',
        fontWeight: '600',
        textAlign: 'center'
      }}>
        Your Mood Trend Over Time
      </h3>
      
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={formattedData}
          margin={margins}
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
            tick={rotateLabels ? customXAxisTick : { 
              fill: 'var(--text-color)', 
              fontSize: FONT_SIZES.getResponsive(FONT_SIZES.small, containerWidth) 
            }}
            height={rotateLabels ? 50 : undefined}
            tickMargin={rotateLabels ? 15 : 10}
            interval={tickInterval}
            axisLine={{ stroke: 'var(--text-secondary)' }}
            label={{ 
              value: 'Date', 
              position: 'insideBottomRight', 
              offset: rotateLabels ? -2 : -5, 
              fill: 'var(--text-color)',
              fontSize: FONT_SIZES.getResponsive(FONT_SIZES.small, containerWidth)
            }}
          />
          
          <YAxis 
            domain={[1, 5]} 
            ticks={[1, 2, 3, 4, 5]} 
            stroke="var(--text-color)" 
            tick={customYAxisTick}
            tickMargin={containerWidth < 350 ? 5 : 10}
            axisLine={{ stroke: 'var(--text-secondary)' }}
            label={{ 
              value: 'Mood Rating', 
              angle: -90, 
              position: 'insideLeft',
              fill: 'var(--text-color)',
              fontSize: FONT_SIZES.getResponsive(FONT_SIZES.small, containerWidth),
              dx: containerWidth < 400 ? -5 : -10
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
            align={containerWidth < 400 ? "center" : "right"}
            iconType="circle"
            formatter={() => (
              <span style={{ 
                color: 'var(--text-color)', 
                fontSize: FONT_SIZES.getResponsive(FONT_SIZES.small, containerWidth) 
              }}>
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
              fontSize: FONT_SIZES.getResponsive(FONT_SIZES.small, containerWidth),
              position: containerWidth < 400 ? "insideTopRight" : "right"
            }}
          />

          <Line 
            type="monotone" 
            dataKey="mood" 
            stroke="url(#moodGradient)" 
            strokeWidth={containerWidth < 350 ? 2 : 3}
            dot={{ 
              fill: 'var(--neon-blue)', 
              r: containerWidth < 350 ? 4 : 6, 
              strokeWidth: 2, 
              stroke: 'var(--white)' 
            }}
            activeDot={{ 
              r: containerWidth < 350 ? 6 : 8, 
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
