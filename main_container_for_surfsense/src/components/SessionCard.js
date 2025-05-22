import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

/**
 * Renders a card for a single surf session
 */
const SessionCard = ({ session }) => {
  // Array of mood emojis from worst to best
  const moodEmojis = ['😞', '😐', '🙂', '😊', '🤩'];
  
  // Get mood index safely
  const moodIndex = session.mood && session.mood >= 1 && session.mood <= 5 
    ? session.mood - 1 
    : 2; // Default to middle mood if invalid
  
  return (
    <div className="card">
      <div className="flex justify-between">
        <h3 className="card-title">{session.spot || 'Unnamed Spot'}</h3>
        <div className="mood-emoji" title={`Mood: ${session.mood || 3}/5`}>
          {moodEmojis[moodIndex]}
        </div>
      </div>
      
      <div className="card-subtitle">
        {session.date ? format(parseISO(session.date), 'MMMM d, yyyy') : 'No date'} • {session.board || 'Unknown board'}
      </div>
      
      <div className="card-body">
        <div>
          <strong>Waves: </strong>{session.waveCount || 0}
        </div>
        {session.notes && (
          <div style={{ marginTop: '8px' }}>
            <em>"{session.notes.length > 100 ? session.notes.substring(0, 100) + '...' : session.notes}"</em>
          </div>
        )}
      </div>
      
      <div className="card-footer">
        <div>
          {session.conditions ? (
            <>
              <span className="tag">{session.conditions.swellHeight || 0}ft</span>
              <span className="tag">{session.conditions.wind || 'Unknown'}</span>
              <span className="tag">{session.conditions.tide || 'Unknown'} Tide</span>
            </>
          ) : (
            <span className="tag">No conditions data</span>
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
