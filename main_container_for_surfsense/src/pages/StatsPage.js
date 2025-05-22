import React from 'react';
import { useSurfData } from '../data/surfContext';
import SpotChart from '../components/charts/SpotChart';
import BoardChart from '../components/charts/BoardChart';
import MoodChart from '../components/charts/MoodChart';

/**
 * Page for displaying surf statistics and charts
 */
const StatsPage = () => {
  const { getStats } = useSurfData();
  
  // Get statistics data
  const stats = getStats();
  
  return (
    <div className="page">
      <h1 className="title">Surf Statistics</h1>
      
      <div className="grid grid-cols-1 grid-cols-3-md" style={{ marginBottom: '32px' }}>
        <div className="stat-card">
          <div className="stat-number">{stats.totalSessions}</div>
          <div className="stat-label">Total Sessions</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.totalWaves}</div>
          <div className="stat-label">Waves Caught</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">
            {stats.averageMood ? stats.averageMood.toFixed(1) : 0}
            <span style={{ fontSize: '1.5rem', marginLeft: '8px' }}>
              {stats.averageMood >= 4 ? '🤩' : 
               stats.averageMood >= 3 ? '😊' : 
               stats.averageMood >= 2 ? '🙂' : '😐'}
            </span>
          </div>
          <div className="stat-label">Average Mood</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 grid-cols-2-md">
        <SpotChart data={stats.spotFrequency} />
        <BoardChart data={stats.boardUsage} />
      </div>
      
      <MoodChart data={stats.moodTrend} />
    </div>
  );
};

export default StatsPage;
