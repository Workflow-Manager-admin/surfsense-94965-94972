import React, { useState, useEffect } from 'react';
import { boardTypes } from '../data/surfContext';

/**
 * Form component for adding/editing surf sessions
 */
const SessionForm = ({ initialData, onSubmit, formType = 'add' }) => {
  // Define default empty session
  const defaultSession = {
    date: new Date().toISOString().split('T')[0],
    spot: '',
    board: 'Shortboard',
    waveCount: 0,
    mood: 3,
    conditions: {
      swellHeight: 3,
      swellDirection: 'S',
      wind: 'Offshore',
      tide: 'Mid',
    },
    notes: ''
  };
  
  // Initialize state with provided data or defaults
  const [formData, setFormData] = useState(initialData || defaultSession);
  
  // Update form if initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested conditions object
    if (name.includes('conditions.')) {
      const conditionField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        conditions: {
          ...prev.conditions,
          [conditionField]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'waveCount' || name === 'mood' ? Number(value) : value
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  // Array of mood emojis from worst to best
  const moodEmojis = ['😞', '😐', '🙂', '😊', '🤩'];
  
  // Swell direction options
  const swellDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  
  // Wind options
  const windOptions = ['Offshore', 'Onshore', 'Cross-shore', 'Light', 'Calm'];
  
  // Tide options
  const tideOptions = ['Low', 'Mid', 'High', 'Rising', 'Falling'];
  
  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="form-group">
        <label className="form-label">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Surf Spot</label>
        <input
          type="text"
          name="spot"
          value={formData.spot}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter surf spot name"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Board Type</label>
        <select
          name="board"
          value={formData.board}
          onChange={handleChange}
          className="form-select"
          required
        >
          {boardTypes.map(board => (
            <option key={board} value={board}>{board}</option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label className="form-label">Wave Count</label>
        <input
          type="number"
          name="waveCount"
          min="0"
          max="1000"
          value={formData.waveCount}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Mood</label>
        <div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              name="mood"
              min="1"
              max="5"
              value={formData.mood}
              onChange={handleChange}
              className="condition-slider"
            />
            <div className="mood-emoji">
              {moodEmojis[formData.mood - 1]}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 grid-cols-2-md">
        <div className="form-group">
          <label className="form-label">Swell Height (ft)</label>
          <input
            type="number"
            name="conditions.swellHeight"
            min="0"
            max="30"
            value={formData.conditions.swellHeight}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Swell Direction</label>
          <select
            name="conditions.swellDirection"
            value={formData.conditions.swellDirection}
            onChange={handleChange}
            className="form-select"
          >
            {swellDirections.map(dir => (
              <option key={dir} value={dir}>{dir}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 grid-cols-2-md">
        <div className="form-group">
          <label className="form-label">Wind</label>
          <select
            name="conditions.wind"
            value={formData.conditions.wind}
            onChange={handleChange}
            className="form-select"
          >
            {windOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Tide</label>
          <select
            name="conditions.tide"
            value={formData.conditions.tide}
            onChange={handleChange}
            className="form-select"
          >
            {tideOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label className="form-label">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="form-control"
          rows="4"
          placeholder="Write about your session..."
        ></textarea>
      </div>
      
      <button type="submit" className="btn btn-large">
        {formType === 'add' ? 'Log Session' : 'Update Session'}
      </button>
    </form>
  );
};

export default SessionForm;
