import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
// SVG imports replaced with emoji icons

// Import actual components
import HomePage from './pages/HomePage';
import NewSessionPage from './pages/NewSessionPage';
import SessionDetailPage from './pages/SessionDetailPage';
import StatsPage from './pages/StatsPage';
import { SurfProvider } from './data/surfContext';

// Import background utilities
import { applyOceanicBackgrounds, applyNeonEffects } from './utils/backgroundLoader';

function App() {
  // Apply background effects after component mounts
  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      applyOceanicBackgrounds();
      applyNeonEffects();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <SurfProvider>
      <Router>
        <div className="app">
          <nav className="navbar">
            <div className="container">
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <div className="logo">
                    <span style={{ 
                      fontSize: '24px',
                      marginRight: '8px',
                      filter: 'drop-shadow(0 0 5px var(--neon-blue))'
                    }}>🌊</span> 
                    <span className="glow-text">SurfSync</span>
                  </div>
                </Link>
                <div className="flex gap-4">
                  <Link to="/stats" style={{ textDecoration: 'none' }}>
                    <button className="btn btn-secondary">
                      <span className="surf-icon" style={{ marginRight: '4px' }}>
                        📊
                      </span>
                      Stats
                    </button>
                  </Link>
                  <Link to="/new" style={{ textDecoration: 'none' }}>
                    <button className="btn">
                      <span className="surf-icon" style={{ marginRight: '4px' }}>
                        🏄
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
