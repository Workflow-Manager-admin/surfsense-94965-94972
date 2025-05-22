import React, { useState, useEffect } from 'react';
import { useSurfData } from '../data/surfContext';
import SpotChart from '../components/charts/SpotChart';
import BoardChart from '../components/charts/BoardChart';
import MoodChart from '../components/charts/MoodChart';
import { FONT_SIZES } from '../utils/chartUtils';

/**
 * Enhanced page for displaying surf statistics and charts with improved layout
 */
const StatsPage = () => {
  const { getStats } = useSurfData();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Monitor viewport size changes
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Get statistics data
  const stats = getStats();
  
  // Responsive style adjustments
  const isSmallScreen = windowWidth < 576;
  const isMediumScreen = windowWidth >= 576 && windowWidth < 768;
  
  // Calculate responsive font sizes and margins
  const titleFontSize = isSmallScreen ? '1.8rem' : '2.2rem';
  const subtitleFontSize = isSmallScreen ? '1.1rem' : '1.3rem';
  const statNumberFontSize = isSmallScreen ? '1.8rem' : '2.2rem';
  const statLabelFontSize = isSmallScreen ? '0.9rem' : '1rem';
  const emojiSize = isSmallScreen ? '1.5rem' : '1.8rem';
  const gridGap = isSmallScreen ? '15px' : isMediumScreen ? '20px' : '30px';
  const chartHeight = isSmallScreen ? '380px' : '350px';
  
  return (
    <div className="page">
      <h1 className="title glow-text" style={{
        marginBottom: isSmallScreen ? '16px' : '24px',
        textAlign: 'center',
        fontSize: titleFontSize
      }}>
        Surf Statistics Dashboard
      </h1>
      
      <div className="glass-panel" style={{
        padding: isSmallScreen ? '15px' : '20px',
        marginBottom: isSmallScreen ? '20px' : '30px',
        borderRadius: '12px'
      }}>
        <h2 className="subtitle glow-text" style={{ 
          marginBottom: isSmallScreen ? '12px' : '16px',
          fontSize: subtitleFontSize,
          textAlign: 'center'
        }}>
          Summary Stats
        </h2>
        
        <div className="grid grid-cols-1 grid-cols-3-md" style={{ 
          marginBottom: '10px',
          gap: isSmallScreen ? '10px' : '15px'
        }}>
          <div className="stat-card" style={{
            background: 'linear-gradient(135deg, rgba(2, 136, 209, 0.8), rgba(3, 169, 244, 0.7))',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s',
            padding: isSmallScreen ? '12px 8px' : '16px'
          }}>
            <div className="stat-number" style={{ fontSize: statNumberFontSize, fontWeight: 'bold' }}>
              {stats.totalSessions}
            </div>
            <div className="stat-label" style={{ fontSize: statLabelFontSize, opacity: 0.9 }}>
              Total Sessions
            </div>
          </div>
          
          <div className="stat-card" style={{
            background: 'linear-gradient(135deg, rgba(0, 131, 143, 0.8), rgba(0, 188, 212, 0.7))',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s',
            padding: isSmallScreen ? '12px 8px' : '16px'
          }}>
            <div className="stat-number" style={{ fontSize: statNumberFontSize, fontWeight: 'bold' }}>
              {stats.totalWaves}
            </div>
            <div className="stat-label" style={{ fontSize: statLabelFontSize, opacity: 0.9 }}>
              Waves Caught
            </div>
          </div>
          
          <div className="stat-card" style={{
            background: 'linear-gradient(135deg, rgba(0, 150, 136, 0.8), rgba(77, 182, 172, 0.7))',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s',
            padding: isSmallScreen ? '12px 8px' : '16px'
          }}>
            <div className="stat-number" style={{ 
              fontSize: statNumberFontSize, 
              fontWeight: 'bold', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              {stats.averageMood ? stats.averageMood.toFixed(1) : 0}
              <span style={{ fontSize: emojiSize, marginLeft: '10px' }}>
                {stats.averageMood >= 4 ? '🤩' : 
                 stats.averageMood >= 3 ? '😊' : 
                 stats.averageMood >= 2 ? '🙂' : '😐'}
              </span>
            </div>
            <div className="stat-label" style={{ fontSize: statLabelFontSize, opacity: 0.9 }}>
              Average Mood
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom chart layout with better responsive behavior */}
      <div className="grid grid-cols-1 grid-cols-2-md" style={{ 
        gap: gridGap, 
        marginBottom: isSmallScreen ? '20px' : '30px'
      }}>
        {/* Ensure consistent heights for charts */}
        <div style={{ height: chartHeight }}>
          <SpotChart data={stats.spotFrequency} />
        </div>
        <div style={{ height: chartHeight }}>
          <BoardChart data={stats.boardUsage} />
        </div>
      </div>
      
      <div style={{ height: chartHeight, marginBottom: '20px' }}>
        <MoodChart data={stats.moodTrend} />
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '20px', 
        color: 'var(--text-secondary)', 
        fontSize: FONT_SIZES.getResponsive ? 
          FONT_SIZES.getResponsive(FONT_SIZES.small, windowWidth) : '0.9rem'
      }}>
        Data shown represents your {stats.totalSessions} recorded surf sessions
      </div>
    </div>
  );
};

export default StatsPage;
