import React from 'react';
import { useSurfData, boardTypes } from '../data/surfContext';

/**
 * Component for filtering surf sessions
 */
const FilterBar = () => {
  const { filters, setFilter, resetFilters } = useSurfData();

  return (
    <div className="filter-section">
      <div className="page-header">
        <h3 className="subtitle">Filter Sessions</h3>
        <button 
          className="btn btn-icon" 
          onClick={resetFilters}
          title="Reset filters"
        >
          ↻
        </button>
      </div>
      
      <div className="grid grid-cols-1 grid-cols-3-md">
        <div className="form-group">
          <label className="form-label">Spot</label>
          <input
            type="text"
            value={filters.spot}
            onChange={e => setFilter('spot', e.target.value)}
            className="form-control"
            placeholder="Enter spot name"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Board</label>
          <select
            value={filters.board}
            onChange={e => setFilter('board', e.target.value)}
            className="form-select"
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
            className="form-select"
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
    </div>
  );
};

export default FilterBar;
