import React from 'react';
import { Link } from 'react-router-dom';
import SessionCard from '../components/SessionCard';
import ReminderBanner from '../components/ReminderBanner';
import FilterBar from '../components/FilterBar';
import { useSurfData } from '../data/surfContext';

/**
 * Home page component displaying session list and filters
 */
const HomePage = () => {
  const { getFilteredSessions, needsSessionReminder } = useSurfData();
  
  // Get filtered sessions
  const sessions = getFilteredSessions();

  return (
    <div className="page">
      {/* Show reminder if needed */}
      {needsSessionReminder() && <ReminderBanner />}

      <div className="page-header">
        <h1 className="title">My Surf Sessions</h1>
        <Link to="/new" style={{ textDecoration: 'none' }}>
          <button className="btn btn-circle">+</button>
        </Link>
      </div>
      
      {/* Filter bar */}
      <FilterBar />
      
      {/* Session list */}
      {sessions.length > 0 ? (
        <div>
          {sessions.map(session => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      ) : (
        <div className="card">
          <p>No sessions found. Try adjusting your filters or add a new session.</p>
          <Link to="/new" style={{ textDecoration: 'none' }}>
            <button className="btn">Log Your First Session</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
