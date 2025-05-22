import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { useSurfData } from '../data/surfContext';

/**
 * Page for viewing session details
 */
const SessionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSessionById, deleteSession } = useSurfData();
  
  // Get session by ID
  const session = getSessionById(id);
  
  // Handle session not found
  if (!session) {
    return (
      <div className="page">
        <h1 className="title">Session Not Found</h1>
        <p>The session you requested could not be found.</p>
        <Link to="/">
          <button className="btn">Back to Home</button>
        </Link>
      </div>
    );
  }
  
  // Handle delete
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      deleteSession(id);
      navigate('/');
    }
  };
  
  // Format date
  const formattedDate = format(parseISO(session.date), 'MMMM d, yyyy');
  
  // Array of mood emojis from worst to best
  const moodEmojis = ['😞', '😐', '🙂', '😊', '🤩'];
  const moodDescriptions = ['Poor', 'Fair', 'Good', 'Great', 'Epic'];
  
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="title">{session.spot}</h1>
        <div className="flex gap-2">
          <Link to={`/edit/${id}`}>
            <button className="btn btn-secondary">Edit</button>
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      
      <div className="card">
        <div className="grid grid-cols-1 grid-cols-3-md" style={{ marginBottom: '24px' }}>
          <div className="stat-card">
            <div className="stat-number">{formattedDate}</div>
            <div className="stat-label">Date</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">{session.waveCount}</div>
            <div className="stat-label">Waves Caught</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">{session.board}</div>
            <div className="stat-label">Board Used</div>
          </div>
        </div>
        
        <h3 className="card-title">Mood</h3>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '24px', 
          backgroundColor: 'rgba(2, 119, 189, 0.1)', 
          padding: '16px', 
          borderRadius: '8px' 
        }}>
          <div className="mood-emoji" style={{ fontSize: '3rem' }}>
            {moodEmojis[session.mood - 1]}
          </div>
          <div>
            <div style={{ fontWeight: '500' }}>
              {moodDescriptions[session.mood - 1]}
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>
              {session.mood}/5 rating
            </div>
          </div>
        </div>
        
        <h3 className="card-title">Conditions</h3>
        <div className="grid grid-cols-2 grid-cols-4-md" style={{ marginBottom: '24px' }}>
          <div>
            <div><strong>Swell:</strong></div> 
            <div>{session.conditions.swellHeight} ft {session.conditions.swellDirection}</div>
          </div>
          <div>
            <div><strong>Wind:</strong></div>
            <div>{session.conditions.wind}</div>
          </div>
          <div>
            <div><strong>Tide:</strong></div>
            <div>{session.conditions.tide}</div>
          </div>
        </div>
        
        {session.notes && (
          <>
            <h3 className="card-title">Notes</h3>
            <div style={{ 
              backgroundColor: 'rgba(245, 240, 225, 0.5)', 
              padding: '16px', 
              borderRadius: '8px',
              fontStyle: 'italic',
              marginBottom: '16px' 
            }}>
              {session.notes}
            </div>
          </>
        )}
        
        <div style={{ marginTop: '24px' }}>
          <Link to="/">
            <button className="btn">Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SessionDetailPage;
