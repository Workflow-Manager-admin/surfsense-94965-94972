import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

// Sample data for initializing the app
const sampleSessions = [
  {
    id: '1',
    date: '2023-05-10',
    spot: 'Malibu Beach',
    board: 'Shortboard',
    waveCount: 15,
    mood: 5,
    conditions: {
      swellHeight: 4,
      swellDirection: 'SW',
      wind: 'Offshore',
      tide: 'Mid',
    },
    notes: 'Great morning session with clean waves and not too crowded.'
  },
  {
    id: '2',
    date: '2023-05-05',
    spot: 'Huntington Beach',
    board: 'Longboard',
    waveCount: 8,
    mood: 3,
    conditions: {
      swellHeight: 2,
      swellDirection: 'W',
      wind: 'Onshore',
      tide: 'Low',
    },
    notes: 'Waves were small but still had fun on the longboard.'
  },
  {
    id: '3',
    date: '2023-05-01',
    spot: 'Malibu Beach',
    board: 'Fish',
    waveCount: 20,
    mood: 4,
    conditions: {
      swellHeight: 3,
      swellDirection: 'S',
      wind: 'Offshore',
      tide: 'High',
    },
    notes: 'Fish board worked great in these conditions.'
  },
  {
    id: '4',
    date: '2023-04-28',
    spot: 'Trestles',
    board: 'Shortboard',
    waveCount: 25,
    mood: 5,
    conditions: {
      swellHeight: 5,
      swellDirection: 'SW',
      wind: 'Offshore',
      tide: 'Mid',
    },
    notes: 'Epic session! Best waves of the month. Got some good turns in.'
  },
  {
    id: '5',
    date: '2023-04-20',
    spot: 'Venice Beach',
    board: 'Foamie',
    waveCount: 12,
    mood: 2,
    conditions: {
      swellHeight: 2,
      swellDirection: 'W',
      wind: 'Onshore',
      tide: 'Low',
    },
    notes: 'Super crowded. Hard to catch waves with so many people.'
  }
];

// Board types for dropdown selection
export const boardTypes = [
  'Shortboard',
  'Longboard',
  'Fish',
  'Foamie',
  'Funboard',
  'Gun',
  'Mini Mal',
  'SUP',
  'Other'
];

// Create context
const SurfContext = createContext();

/**
 * Custom hook for using SurfContext
 */
export const useSurfData = () => {
  return useContext(SurfContext);
};

/**
 * SurfContext Provider component
 */
export const SurfProvider = ({ children }) => {
  // State for surf sessions
  const [sessions, setSessions] = useState([]);
  
  // State for filters
  const [filters, setFilters] = useState({
    spot: '',
    board: '',
    mood: '',
    dateFrom: '',
    dateTo: ''
  });

  // Load sessions from localStorage on initial load
  useEffect(() => {
    const storedSessions = localStorage.getItem('surfSessions');
    if (storedSessions) {
      setSessions(JSON.parse(storedSessions));
    } else {
      // Use sample data if no sessions found in localStorage
      setSessions(sampleSessions);
    }
  }, []);

  // Save sessions to localStorage whenever sessions change
  useEffect(() => {
    localStorage.setItem('surfSessions', JSON.stringify(sessions));
  }, [sessions]);

  /**
   * Add a new surf session
   */
  const addSession = (session) => {
    const newSession = {
      ...session,
      id: Date.now().toString()
    };
    setSessions(prevSessions => [...prevSessions, newSession]);
    return newSession;
  };

  /**
   * Update an existing session
   */
  const updateSession = (id, updatedData) => {
    setSessions(prevSessions => 
      prevSessions.map(session => 
        session.id === id ? { ...session, ...updatedData } : session
      )
    );
  };

  /**
   * Delete a session
   */
  const deleteSession = (id) => {
    setSessions(prevSessions => 
      prevSessions.filter(session => session.id !== id)
    );
  };

  /**
   * Get a single session by ID
   */
  const getSessionById = (id) => {
    return sessions.find(session => session.id === id);
  };

  /**
   * Apply filters to sessions
   */
  const getFilteredSessions = () => {
    return sessions.filter(session => {
      // Filter by spot
      if (filters.spot && !session.spot.toLowerCase().includes(filters.spot.toLowerCase())) {
        return false;
      }
      
      // Filter by board type
      if (filters.board && session.board !== filters.board) {
        return false;
      }
      
      // Filter by mood
      if (filters.mood && session.mood !== parseInt(filters.mood)) {
        return false;
      }
      
      // Filter by date range
      if (filters.dateFrom && session.date < filters.dateFrom) {
        return false;
      }
      
      if (filters.dateTo && session.date > filters.dateTo) {
        return false;
      }
      
      return true;
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date (newest first)
  };

  /**
   * Set filters for sessions
   */
  const setFilter = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  /**
   * Reset all filters
   */
  const resetFilters = () => {
    setFilters({
      spot: '',
      board: '',
      mood: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  /**
   * Check if user needs a reminder to log a session today
   */
  const needsSessionReminder = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return !sessions.some(session => session.date === today);
  };

  /**
   * Get statistics for the dashboard
   */
  const getStats = () => {
    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        totalWaves: 0,
        averageMood: 0,
        spotFrequency: [],
        boardUsage: [],
        moodTrend: []
      };
    }

    // Calculate total waves caught
    const totalWaves = sessions.reduce((sum, session) => sum + session.waveCount, 0);
    
    // Calculate average mood
    const averageMood = sessions.reduce((sum, session) => sum + session.mood, 0) / sessions.length;
    
    // Calculate spot frequency
    const spots = {};
    sessions.forEach(session => {
      spots[session.spot] = (spots[session.spot] || 0) + 1;
    });
    const spotFrequency = Object.entries(spots)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
      
    // Calculate board usage percentage
    const boards = {};
    sessions.forEach(session => {
      boards[session.board] = (boards[session.board] || 0) + 1;
    });
    const boardUsage = Object.entries(boards)
      .map(([name, count]) => ({ 
        name, 
        percentage: Math.round((count / sessions.length) * 100) 
      }))
      .sort((a, b) => b.percentage - a.percentage);
      
    // Calculate mood trend over time
    const last10Sessions = [...sessions]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-10);
    const moodTrend = last10Sessions.map(session => ({
      date: session.date,
      mood: session.mood
    }));
    
    return {
      totalSessions: sessions.length,
      totalWaves,
      averageMood,
      spotFrequency,
      boardUsage,
      moodTrend
    };
  };

  // Context value
  const value = {
    sessions,
    filters,
    addSession,
    updateSession,
    deleteSession,
    getSessionById,
    getFilteredSessions,
    setFilter,
    resetFilters,
    needsSessionReminder,
    getStats
  };

  return (
    <SurfContext.Provider value={value}>
      {children}
    </SurfContext.Provider>
  );
};
