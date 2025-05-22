import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

/**
 * Renders a card for a single surf session
 */
const SessionCard = ({ session }) => {
  // Array of mood emojis from worst to best
  const moodEmojis = ['😞', '😐', '🙂', '😊', '🤩'];
  
  return (
    <div className="card">
      <div className="flex justify-between">
        <h3 className="card-title">{session.spot}</h3>
        <div className="mood-emoji" title={`Mood: ${session.mood}/5`}>
          {moodEmojis[session.mood - 1]}
        </div>
      </div>
      
      <div className="card-subtitle">
        {format(parseISO(session.date), 'MMMM d, yyyy')} • {session.board}
      </div>
      
      <div className="card-body">
        <div>
          <strong>Waves: </strong>{session.waveCount}
        </div>
        {session.notes && (
          <div style={{ marginTop: '8px' }}>
            <em>"{session.notes.length > 100 ? session.notes.substring(0, 100) + '...' : session.notes}"</em>
          </div>
        )}
      </div>
      
      <div className="card-footer">
        <div>
          <span className="tag">{session.conditions.swellHeight}ft</span>
          <span className="tag">{session.conditions.wind}</span>
          <span className="tag">{session.conditions.tide} Tide</span>
        </div>
        <Link to={`/session/${session.id}`}>
          <button className="btn btn-secondary">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default SessionCard;
