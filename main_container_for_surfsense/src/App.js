import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { SurfProvider } from './data/surfContext';
import HomePage from './pages/HomePage';
import NewSessionPage from './pages/NewSessionPage';
import SessionDetailPage from './pages/SessionDetailPage';
import StatsPage from './pages/StatsPage';

function App() {
  return (
    <SurfProvider>
      <Router>
        <div className="app wave-bg">
          <nav className="navbar">
            <div className="container">
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <div className="logo">
                    <span className="logo-symbol">🌊</span> SurfSync
                  </div>
                </Link>
                <div className="flex gap-4">
                  <Link to="/stats" style={{ textDecoration: 'none' }}>
                    <button className="btn btn-secondary">Stats</button>
                  </Link>
                  <Link to="/new" style={{ textDecoration: 'none' }}>
                    <button className="btn">+ New Session</button>
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
