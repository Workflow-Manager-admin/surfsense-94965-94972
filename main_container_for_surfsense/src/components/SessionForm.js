import React, { useState, useEffect } from 'react';
import { boardTypes } from '../data/surfContext';
import { ReactComponent as WaveIcon } from '../assets/icons/wave.svg';
import { ReactComponent as SurfboardIcon } from '../assets/icons/surfboard.svg';
import { ReactComponent as SunIcon } from '../assets/icons/sun.svg';
import { ReactComponent as TideIcon } from '../assets/icons/tide.svg';

/**
 * Form component for adding/editing surf sessions with futuristic styling
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
  const moodLabels = ['Poor', 'Fair', 'Good', 'Great', 'Epic'];
  
  // Swell direction options
  const swellDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  
  // Wind options
  const windOptions = ['Offshore', 'Onshore', 'Cross-shore', 'Light', 'Calm'];
  
  // Tide options
  const tideOptions = ['Low', 'Mid', 'High', 'Rising', 'Falling'];
  
  return (
    <form onSubmit={handleSubmit} className="card glass-panel">
      <h2 className="glow-text" style={{ 
        marginBottom: '20px', 
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: '600'
      }}>
        {formType === 'add' ? 'Log New Surf Session' : 'Update Surf Session'}
      </h2>
      
      <div className="wave-divider"></div>
      
      <div className="form-group">
        <label className="form-label flex items-center">
          <SunIcon stroke="var(--neon-blue)" style={{ width: '20px', marginRight: '8px' }} />
          Date
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="form-control neon-border"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label flex items-center">
          <WaveIcon stroke="var(--neon-blue)" style={{ width: '20px', marginRight: '8px' }} />
          Surf Spot
        </label>
        <input
          type="text"
          name="spot"
          value={formData.spot}
          onChange={handleChange}
          className="form-control neon-border"
          placeholder="Enter surf spot name"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label flex items-center">
          <SurfboardIcon stroke="var(--neon-blue)" style={{ width: '20px', marginRight: '8px' }} />
          Board Type
        </label>
        <select
          name="board"
          value={formData.board}
          onChange={handleChange}
          className="form-select neon-border"
          required
          style={{ background: 'rgba(13, 71, 161, 0.6)' }}
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
          className="form-control neon-border"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Mood</label>
        <div className="glass-panel" style={{ padding: '15px', marginBottom: '10px' }}>
          <div className="flex flex-col gap-2">
            <input
              type="range"
              name="mood"
              min="1"
              max="5"
              value={formData.mood}
              onChange={handleChange}
              className="condition-slider"
            />
            <div className="flex justify-between">
              {moodLabels.map((label, index) => (
                <div 
                  key={index} 
                  className={`text-xs ${formData.mood === index + 1 ? 'glow-text' : ''}`}
                  style={{ 
                    transition: 'all 0.3s ease', 
                    opacity: formData.mood === index + 1 ? 1 : 0.6
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center">
              <div className="mood-emoji" style={{ 
                fontSize: '2.5rem', 
                textShadow: '0 0 10px rgba(0, 229, 255, 0.7)',
                margin: '10px 0'
              }}>
                {moodEmojis[formData.mood - 1]}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="wave-divider"></div>
      
      <h3 className="subtitle glow-text">Conditions</h3>
      
      <div className="grid grid-cols-1 grid-cols-2-md" style={{ gap: '15px' }}>
        <div className="form-group">
          <label className="form-label flex items-center">
            <WaveIcon stroke="var(--neon-blue)" style={{ width: '18px', marginRight: '8px' }} />
            Swell Height (ft)
          </label>
          <input
            type="number"
            name="conditions.swellHeight"
            min="0"
            max="30"
            value={formData.conditions.swellHeight}
            onChange={handleChange}
            className="form-control neon-border"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Swell Direction</label>
          <select
            name="conditions.swellDirection"
            value={formData.conditions.swellDirection}
            onChange={handleChange}
            className="form-select neon-border"
            style={{ background: 'rgba(13, 71, 161, 0.6)' }}
          >
            {swellDirections.map(dir => (
              <option key={dir} value={dir}>{dir}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 grid-cols-2-md" style={{ gap: '15px' }}>
        <div className="form-group">
          <label className="form-label">Wind</label>
          <select
            name="conditions.wind"
            value={formData.conditions.wind}
            onChange={handleChange}
            className="form-select neon-border"
            style={{ background: 'rgba(13, 71, 161, 0.6)' }}
          >
            {windOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label flex items-center">
            <TideIcon stroke="var(--neon-blue)" style={{ width: '18px', marginRight: '8px' }} />
            Tide
          </label>
          <select
            name="conditions.tide"
            value={formData.conditions.tide}
            onChange={handleChange}
            className="form-select neon-border"
            style={{ background: 'rgba(13, 71, 161, 0.6)' }}
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
          className="form-control neon-border"
          rows="4"
          placeholder="Write about your session..."
          style={{ background: 'rgba(13, 71, 161, 0.4)' }}
        ></textarea>
      </div>
      
      <button type="submit" className="btn btn-large" style={{ marginTop: '10px' }}>
        {formType === 'add' ? '🌊 Log Session' : '🌊 Update Session'}
      </button>
    </form>
  );
};

export default SessionForm;
