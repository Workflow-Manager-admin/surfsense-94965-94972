import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Simplified components for debugging purposes
const HomePage = () => (
  <div className="page">
    <h1 className="title">My Surf Sessions</h1>
    <p>Home page content will go here.</p>
  </div>
);

const NewSessionPage = () => (
  <div className="page">
    <h1 className="title">Log New Session</h1>
    <p>Form will go here.</p>
  </div>
);

const SessionDetailPage = () => (
  <div className="page">
    <h1 className="title">Session Details</h1>
    <p>Details will go here.</p>
  </div>
);

const StatsPage = () => (
  <div className="page">
    <h1 className="title">Statistics</h1>
    <p>Stats will go here.</p>
  </div>
);

// Simplified provider
const SurfProvider = ({ children }) => {
  return <>{children}</>;
};

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
