import React from 'react';
import { useSurfData, boardTypes } from '../data/surfContext';
import { ReactComponent as FilterIcon } from '../assets/icons/filter.svg';
import { ReactComponent as WaveIcon } from '../assets/icons/wave.svg';
import { ReactComponent as SurfboardIcon } from '../assets/icons/surfboard.svg';

/**
 * Component for filtering surf sessions with futuristic styling
 */
const FilterBar = () => {
  const { filters, setFilter, resetFilters } = useSurfData();

  return (
    <div className="filter-section glass-panel" style={{
      background: 'rgba(1, 87, 155, 0.4)',
      backdropFilter: 'blur(10px)',
      border: '1px solid var(--border-color)',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="page-header">
        <h3 className="subtitle glow-text" style={{ display: 'flex', alignItems: 'center' }}>
          <FilterIcon stroke="var(--neon-blue)" style={{ 
            width: '18px', 
            height: '18px',
            marginRight: '8px' 
          }} />
          Filter Sessions
        </h3>
        <button 
          className="btn btn-icon neon-border" 
          onClick={resetFilters}
          title="Reset filters"
          style={{
            background: 'rgba(0, 229, 255, 0.1)',
            boxShadow: '0 0 10px rgba(0, 229, 255, 0.3)'
          }}
        >
          ↻
        </button>
      </div>
      
      <div className="grid grid-cols-1 grid-cols-3-md" style={{ gap: '15px' }}>
        <div className="form-group">
          <label className="form-label flex items-center">
            <WaveIcon stroke="var(--neon-blue)" style={{ width: '18px', marginRight: '8px' }} />
            Spot
          </label>
          <input
            type="text"
            value={filters.spot}
            onChange={e => setFilter('spot', e.target.value)}
            className="form-control neon-border"
            placeholder="Enter spot name"
            style={{ background: 'rgba(13, 71, 161, 0.3)' }}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label flex items-center">
            <SurfboardIcon stroke="var(--neon-blue)" style={{ width: '18px', marginRight: '8px' }} />
            Board
          </label>
          <select
            value={filters.board}
            onChange={e => setFilter('board', e.target.value)}
            className="form-select neon-border"
            style={{ background: 'rgba(13, 71, 161, 0.3)' }}
          >
            <option value="">All Boards</option>
            {boardTypes.map(board => (
              <option key={board} value={board}>{board}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Mood</label>
          <select
            value={filters.mood}
            onChange={e => setFilter('mood', e.target.value)}
            className="form-select neon-border"
            style={{ background: 'rgba(13, 71, 161, 0.3)' }}
          >
            <option value="">All Moods</option>
            {[1, 2, 3, 4, 5].map(mood => (
              <option key={mood} value={mood}>
                {mood === 1 ? '😞 Poor' :
                 mood === 2 ? '😐 Fair' :
                 mood === 3 ? '🙂 Good' :
                 mood === 4 ? '😊 Great' : '🤩 Epic'}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Subtle wave pattern in the background */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '40px',
        background: 'url("../assets/images/wave-bg.svg")',
        backgroundSize: 'cover',
        opacity: '0.1',
        zIndex: '-1'
      }}></div>
    </div>
  );
};

export default FilterBar;
