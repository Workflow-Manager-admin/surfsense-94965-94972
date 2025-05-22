import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { ReactComponent as WaveIcon } from './assets/icons/wave.svg';
import { ReactComponent as SurfboardIcon } from './assets/icons/surfboard.svg';

// Import actual components
import HomePage from './pages/HomePage';
import NewSessionPage from './pages/NewSessionPage';
import SessionDetailPage from './pages/SessionDetailPage';
import StatsPage from './pages/StatsPage';
import { SurfProvider } from './data/surfContext';

function App() {
  return (
    <SurfProvider>
      <Router>
        <div className="app">
          <nav className="navbar">
            <div className="container">
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <div className="logo">
                    <WaveIcon stroke="var(--neon-blue)" style={{ 
                      width: '24px', 
                      height: '24px',
                      filter: 'drop-shadow(0 0 5px var(--neon-blue))'
                    }} /> 
                    <span className="glow-text">SurfSync</span>
                  </div>
                </Link>
                <div className="flex gap-4">
                  <Link to="/stats" style={{ textDecoration: 'none' }}>
                    <button className="btn btn-secondary">
                      <span className="surf-icon" style={{ width: '16px', height: '16px' }}>
                        <WaveIcon stroke="currentColor" />
                      </span>
                      Stats
                    </button>
                  </Link>
                  <Link to="/new" style={{ textDecoration: 'none' }}>
                    <button className="btn">
                      <span className="surf-icon" style={{ width: '16px', height: '16px' }}>
                        <SurfboardIcon stroke="currentColor" />
                      </span>
                      New Session
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main>
            <div className="container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/new" element={<NewSessionPage />} />
                <Route path="/edit/:id" element={<NewSessionPage />} />
                <Route path="/session/:id" element={<SessionDetailPage />} />
                <Route path="/stats" element={<StatsPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </SurfProvider>
  );
}

export default App;
