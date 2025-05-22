import React from 'react';
import { useSurfData } from '../data/surfContext';
import SpotChart from '../components/charts/SpotChart';
import BoardChart from '../components/charts/BoardChart';
import MoodChart from '../components/charts/MoodChart';

/**
 * Enhanced page for displaying surf statistics and charts with improved layout
 */
const StatsPage = () => {
  const { getStats } = useSurfData();
  
  // Get statistics data
  const stats = getStats();
  
  return (
    <div className="page">
      <h1 className="title glow-text" style={{
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        Surf Statistics Dashboard
      </h1>
      
      <div className="glass-panel" style={{
        padding: '20px',
        marginBottom: '30px',
        borderRadius: '12px'
      }}>
        <h2 className="subtitle glow-text" style={{ 
          marginBottom: '16px',
          fontSize: '1.3rem',
          textAlign: 'center'
        }}>
          Summary Stats
        </h2>
        
        <div className="grid grid-cols-1 grid-cols-3-md" style={{ marginBottom: '10px' }}>
          <div className="stat-card" style={{
            background: 'linear-gradient(135deg, rgba(2, 136, 209, 0.8), rgba(3, 169, 244, 0.7))',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s',
          }}>
            <div className="stat-number" style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>
              {stats.totalSessions}
            </div>
            <div className="stat-label" style={{ fontSize: '1rem', opacity: 0.9 }}>
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
          }}>
            <div className="stat-number" style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>
              {stats.totalWaves}
            </div>
            <div className="stat-label" style={{ fontSize: '1rem', opacity: 0.9 }}>
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
          }}>
            <div className="stat-number" style={{ fontSize: '2.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {stats.averageMood ? stats.averageMood.toFixed(1) : 0}
              <span style={{ fontSize: '1.8rem', marginLeft: '10px' }}>
                {stats.averageMood >= 4 ? '🤩' : 
                 stats.averageMood >= 3 ? '😊' : 
                 stats.averageMood >= 2 ? '🙂' : '😐'}
              </span>
            </div>
            <div className="stat-label" style={{ fontSize: '1rem', opacity: 0.9 }}>
              Average Mood
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 grid-cols-2-md" style={{ gap: '30px', marginBottom: '30px' }}>
        <SpotChart data={stats.spotFrequency} />
        <BoardChart data={stats.boardUsage} />
      </div>
      
      <MoodChart data={stats.moodTrend} />
      
      <div style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        Data shown represents your {stats.totalSessions} recorded surf sessions
      </div>
    </div>
  );
};

export default StatsPage;
