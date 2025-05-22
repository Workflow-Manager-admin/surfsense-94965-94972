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

// Font sizes with responsive multipliers for different viewport sizes
export const FONT_SIZES = {
  xsmall: 10,
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18,
  
  // Responsive size calculation helper
  getResponsive: (baseSize, containerWidth) => {
    if (!containerWidth) return baseSize;
    
    // Scale down font size for smaller containers
    if (containerWidth < 300) return Math.max(8, baseSize * 0.75);
    if (containerWidth < 500) return Math.max(9, baseSize * 0.85);
    if (containerWidth < 768) return baseSize * 0.9;
    
    return baseSize;
  }
};

// Chart margins to prevent text overlapping
export const CHART_MARGINS = {
  small: { top: 10, right: 15, bottom: 15, left: 15 },
  medium: { top: 20, right: 35, bottom: 30, left: 30 },
  large: { top: 30, right: 45, bottom: 40, left: 45 },
  
  // Get responsive margins based on container size and data complexity
  getResponsive: (baseMargins, containerWidth, dataLength = 0) => {
    const scaleFactor = containerWidth < 500 ? 0.8 : containerWidth < 768 ? 0.9 : 1;
    
    // Increase bottom margin for many data points on x-axis
    const extraBottomMargin = dataLength > 6 ? 15 : dataLength > 3 ? 10 : 0;
    
    return {
      top: baseMargins.top * scaleFactor,
      right: baseMargins.right * scaleFactor,
      bottom: (baseMargins.bottom * scaleFactor) + extraBottomMargin,
      left: baseMargins.left * scaleFactor + (containerWidth < 400 ? 10 : 0)
    };
  }
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

// Calculate dynamic font size based on available space and text length
export const dynamicFontSize = (containerWidth, textLength) => {
  if (!containerWidth) containerWidth = window.innerWidth < 768 ? 300 : 500;
  
  if (containerWidth < 200) return FONT_SIZES.xsmall;
  if (textLength > 20) return FONT_SIZES.getResponsive(FONT_SIZES.xsmall, containerWidth);
  if (textLength > 10) return FONT_SIZES.getResponsive(FONT_SIZES.small, containerWidth);
  return FONT_SIZES.getResponsive(FONT_SIZES.medium, containerWidth);
};

// Dynamic bar width calculation based on number of items and container width
export const calculateBarSize = (dataLength, containerWidth) => {
  const baseSize = dataLength <= 3 ? 60 : 
                  dataLength <= 5 ? 40 : 
                  dataLength <= 8 ? 30 : 20;
                  
  // Further adjust based on container width
  if (containerWidth && containerWidth < 400) {
    return Math.max(15, baseSize * 0.7);
  }
  
  return baseSize;
};

// Determine if labels should be rotated based on data density and container width
export const shouldRotateLabels = (dataLength, containerWidth) => {
  if (!containerWidth) containerWidth = window.innerWidth;
  
  // For small screens or many data points
  if (containerWidth < 500) return true;
  if (dataLength > 4 && containerWidth < 768) return true;
  if (dataLength > 6) return true;
  
  return false;
};

// Determines optimal rotation angle based on text length and available width
export const getLabelRotation = (textLength, containerWidth) => {
  if (!containerWidth) containerWidth = window.innerWidth;
  
  if (textLength > 10 && containerWidth < 400) return -45;
  if (textLength > 8) return -30;
  if (containerWidth < 500 && textLength > 5) return -30;
  if (containerWidth < 768 && textLength > 7) return -25;
  
  return 0;
};

// Determines if data points should be skipped to prevent overcrowding
export const getTickInterval = (dataLength, containerWidth) => {
  if (!containerWidth) containerWidth = window.innerWidth;
  
  if (dataLength > 10 && containerWidth < 500) return Math.ceil(dataLength / 4);
  if (dataLength > 8 && containerWidth < 768) return Math.ceil(dataLength / 5);
  if (dataLength > 12) return Math.ceil(dataLength / 6);
  
  return 0; // Show all ticks
};

// Enhanced text truncation that adjusts based on container size
export const truncateText = (text, maxLength = 12, containerWidth) => {
  if (!text) return '';
  
  // Adjust max length based on container size
  if (containerWidth) {
    if (containerWidth < 350) maxLength = 6;
    else if (containerWidth < 500) maxLength = 8;
    else if (containerWidth < 768) maxLength = 10;
  }
  
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

// Determines whether to show labels based on data density and container width
export const shouldShowLabels = (dataLength, containerWidth, elementWidth) => {
  if (!containerWidth) containerWidth = window.innerWidth;
  
  // If labels would be very cramped, don't show them
  const approximateWidth = containerWidth / dataLength;
  
  // If each label would have less than 40px (or element width + 10px padding), hide them
  const minWidth = elementWidth ? (elementWidth + 10) : 40;
  if (approximateWidth < minWidth) return false;
  
  return true;
};
