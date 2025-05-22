import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ReactComponent as WaveIcon } from '../assets/icons/wave.svg';
import { ReactComponent as SurfboardIcon } from '../assets/icons/surfboard.svg';
import { ReactComponent as TideIcon } from '../assets/icons/tide.svg';

/**
 * Renders a card for a single surf session with futuristic UI
 */
const SessionCard = ({ session }) => {
  // Array of mood emojis from worst to best
  const moodEmojis = ['😞', '😐', '🙂', '😊', '🤩'];
  const moodDescriptions = ['Poor', 'Fair', 'Good', 'Great', 'Epic'];
  
  // Get mood index safely
  const moodIndex = session.mood && session.mood >= 1 && session.mood <= 5 
    ? session.mood - 1 
    : 2; // Default to middle mood if invalid
  
  return (
    <div className="card beach-card-bg">
      <div className="card-header flex justify-between">
        <div className="flex items-center">
          <div className="surf-icon">
            <WaveIcon stroke="var(--neon-blue)" />
          </div>
          <h3 className="card-title glow-text">{session.spot || 'Unnamed Spot'}</h3>
        </div>
        <div className="mood-emoji neon-border" style={{ 
          borderRadius: '50%', 
          width: '40px', 
          height: '40px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 0 10px rgba(0, 229, 255, 0.3)',
          background: 'rgba(0, 229, 255, 0.1)'
        }} title={`Mood: ${moodDescriptions[moodIndex]}, ${session.mood || 3}/5`}>
          {moodEmojis[moodIndex]}
        </div>
      </div>
      
      <div className="card-subtitle" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {session.date ? format(parseISO(session.date), 'MMMM d, yyyy') : 'No date'} 
        <span className="flex items-center">
          <div className="surf-icon" style={{ width: '16px', height: '16px', marginLeft: '8px' }}>
            <SurfboardIcon stroke="var(--aqua)" />
          </div>
          {session.board || 'Unknown board'}
        </span>
      </div>
      
      <div className="card-body glass-panel" style={{ margin: '12px 0' }}>
        <div className="flex items-center">
          <strong className="glow-text">Waves: </strong>
          <span className="neon-border" style={{ 
            borderRadius: '50%', 
            width: '30px', 
            height: '30px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginLeft: '8px',
            background: 'rgba(0, 229, 255, 0.1)'
          }}>
            {session.waveCount || 0}
          </span>
        </div>
        {session.notes && (
          <div style={{ 
            marginTop: '8px',
            padding: '10px', 
            borderRadius: '8px', 
            background: 'rgba(0, 229, 255, 0.05)',
            borderLeft: '2px solid var(--neon-teal)'
          }}>
            <em>"{session.notes.length > 100 ? session.notes.substring(0, 100) + '...' : session.notes}"</em>
          </div>
        )}
      </div>
      
      <div className="card-footer">
        <div>
          {session.conditions ? (
            <>
              <span className="futuristic-tag">
                <WaveIcon stroke="currentColor" style={{ width: '14px', marginRight: '4px' }} />
                {session.conditions.swellHeight || 0}ft
              </span>
              <span className="futuristic-tag">
                {session.conditions.wind || 'Unknown'}
              </span>
              <span className="futuristic-tag">
                <TideIcon stroke="currentColor" style={{ width: '14px', marginRight: '4px' }} />
                {session.conditions.tide || 'Unknown'} Tide
              </span>
            </>
          ) : (
            <span className="futuristic-tag">No conditions data</span>
          )}
        </div>
        <Link to={`/session/${session.id}`}>
          <button className="btn btn-secondary">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default SessionCard;
