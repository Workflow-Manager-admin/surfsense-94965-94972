import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Banner that displays a reminder to log today's session
 */
const ReminderBanner = () => {
  return (
    <div className="reminder-banner">
      <div>
        <span role="img" aria-label="wave">🏄‍♂️</span> Surf today? Don't forget to log your session!
      </div>
      <Link to="/new" style={{ textDecoration: 'none' }}>
        <button className="btn">Log Now</button>
      </Link>
    </div>
  );
};

export default ReminderBanner;
