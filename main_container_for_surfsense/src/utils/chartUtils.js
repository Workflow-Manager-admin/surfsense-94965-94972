/**
 * Chart utility functions and constants for consistent styling across all charts
 */

// Accessible color palettes for charts with better contrast
export const CHART_COLORS = {
  // Main colors for bar and line charts
  primary: ['#0288D1', '#03A9F4', '#00BCD4', '#1DE9B6', '#4FC3F7', '#29B6F6', '#26C6DA'],
  
  // Colors for pie chart with better differentiation
  pie: ['#01579B', '#0288D1', '#039BE5', '#4FC3F7', '#B3E5FC', '#00BCD4', '#26C6DA', '#80DEEA'],
  
  // Colors for mood indicators
  mood: {
    poor: '#FF5252',    // Red for poor mood
    fair: '#FFC107',    // Amber for fair mood
    good: '#4CAF50',    // Green for good mood
    great: '#2196F3',   // Blue for great mood
    epic: '#9C27B0'     // Purple for epic mood
  }
};

// Font sizes for better readability
export const FONT_SIZES = {
  xsmall: 10,
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18
};

// Chart margins to prevent text overlapping
export const CHART_MARGINS = {
  small: { top: 10, right: 10, bottom: 10, left: 10 },
  medium: { top: 20, right: 30, bottom: 20, left: 20 },
  large: { top: 30, right: 40, bottom: 30, left: 40 }
};

// Tooltip styling for better visibility
export const TOOLTIP_STYLE = {
  default: {
    backgroundColor: 'rgba(1, 87, 155, 0.95)',
    borderColor: '#00E5FF',
    color: '#FFFFFF',
    borderRadius: '8px',
    padding: '12px',
    boxShadow: '0 4px 20px rgba(0, 229, 255, 0.3)',
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '1.5',
    border: '1px solid #00E5FF'
  },
  light: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#0288D1',
    color: '#01579B',
    borderRadius: '8px',
    padding: '12px',
    boxShadow: '0 4px 20px rgba(2, 136, 209, 0.2)',
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '1.5',
    border: '1px solid #0288D1'
  }
};

// Chart container styling
export const CHART_CONTAINER_STYLE = {
  default: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    marginBottom: '24px',
    height: '350px' // Increased from 300px for more space
  },
  glass: {
    background: 'rgba(1, 87, 155, 0.7)',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)',
    border: '1px solid var(--border-color)',
    backdropFilter: 'blur(10px)',
    marginBottom: '24px',
    height: '350px',
    position: 'relative',
    overflow: 'hidden'
  }
};

// Label formatter for tooltips
export const formatMoodLabel = (value) => {
  switch (value) {
    case 1:
      return '😞 Poor';
    case 2:
      return '😐 Fair';
    case 3:
      return '🙂 Good';
    case 4:
      return '😊 Great';
    case 5:
      return '🤩 Epic';
    default:
      return `${value}`;
  }
};

// Text truncation helper for long labels
export const truncateText = (text, maxLength = 12) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

// Calculate dynamic font size based on available space
export const dynamicFontSize = (containerWidth, textLength) => {
  if (containerWidth < 200) return FONT_SIZES.xsmall;
  if (textLength > 20) return FONT_SIZES.xsmall;
  if (textLength > 10) return FONT_SIZES.small;
  return FONT_SIZES.medium;
};

// Dynamic bar width calculation based on number of items
export const calculateBarSize = (dataLength) => {
  if (dataLength <= 3) return 60;
  if (dataLength <= 5) return 40;
  if (dataLength <= 8) return 30;
  return 20;
};
