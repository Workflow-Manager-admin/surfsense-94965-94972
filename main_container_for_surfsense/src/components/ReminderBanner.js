import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as WaveIcon } from '../assets/icons/wave.svg';

/**
 * Banner that displays a reminder to log today's session with futuristic styling
 */
const ReminderBanner = () => {
  return (
    <div className="reminder-banner glass-panel" style={{
      background: 'linear-gradient(90deg, rgba(0, 136, 209, 0.7), rgba(0, 188, 212, 0.5))',
      borderLeft: '4px solid var(--neon-blue)',
      boxShadow: '0 0 15px rgba(0, 229, 255, 0.4)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="flex items-center">
        <WaveIcon stroke="white" style={{ 
          width: '24px', 
          height: '24px',
          marginRight: '10px',
          filter: 'drop-shadow(0 0 5px var(--neon-blue))'
        }} />
        <span className="glow-text">Surf today? Don't forget to log your session!</span>
      </div>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("../assets/images/wave-bg.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.1,
        zIndex: -1
      }}></div>
      <Link to="/new" style={{ textDecoration: 'none' }}>
        <button className="btn">Log Now</button>
      </Link>
    </div>
  );
};

export default ReminderBanner;
