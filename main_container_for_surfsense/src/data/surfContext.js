import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

// Sample data for initializing the app with diverse entries
const sampleSessions = [
  // Recent sessions (June 2023)
  {
    id: '1',
    date: '2023-06-15',
    spot: 'Malibu Surfrider',
    board: 'Longboard',
    waveCount: 22,
    mood: 5,
    conditions: {
      swellHeight: 3,
      swellDirection: 'S',
      wind: 'Offshore',
      tide: 'Mid',
    },
    notes: 'Perfect morning glass! Dawn patrol paid off with empty lineup and consistent sets.'
  },
  {
    id: '2',
    date: '2023-06-12',
    spot: 'Huntington Pier',
    board: 'Shortboard',
    waveCount: 17,
    mood: 4,
    conditions: {
      swellHeight: 4,
      swellDirection: 'SW',
      wind: 'Cross-shore',
      tide: 'Low',
    },
    notes: 'South swell picking up, caught some decent rights off the pier.'
  },
  {
    id: '3',
    date: '2023-06-05',
    spot: 'Rincon Point',
    board: 'Fish',
    waveCount: 28,
    mood: 5,
    conditions: {
      swellHeight: 4,
      swellDirection: 'NW',
      wind: 'Offshore',
      tide: 'Mid',
    },
    notes: 'Fish was the perfect choice for today.'
  },
  
  // May 2023 sessions
  {
    id: '4',
    date: '2023-05-28',
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
    notes: 'Epic session! Best waves of the month.'
  },
  {
    id: '5',
    date: '2023-05-21',
    spot: 'El Porto',
    board: 'Shortboard',
    waveCount: 14,
    mood: 3,
    conditions: {
      swellHeight: 3,
      swellDirection: 'W',
      wind: 'Onshore',
      tide: 'High',
    },
    notes: 'Conditions turned during session.'
  },
  {
    id: '6',
    date: '2023-05-15',
    spot: 'Venice Beach',
    board: 'Foamie',
    waveCount: 19,
    mood: 2,
    conditions: {
      swellHeight: 2,
      swellDirection: 'SW',
      wind: 'Onshore',
      tide: 'High',
    },
    notes: 'Way too crowded today.'
  },
  {
    id: '7',
    date: '2023-05-08',
    spot: 'Malibu Beach',
    board: 'Longboard',
    waveCount: 18,
    mood: 4,
    conditions: {
      swellHeight: 2,
      swellDirection: 'SW',
      wind: 'Calm',
      tide: 'Mid',
    },
    notes: 'Small but fun waves today.'
  },
  {
    id: '8',
    date: '2023-05-02',
    spot: 'County Line',
    board: 'Fish',
    waveCount: 20,
    mood: 4,
    conditions: {
      swellHeight: 3,
      swellDirection: 'S',
      wind: 'Offshore',
      tide: 'Low',
    },
    notes: 'Morning glass with just a few people out.'
  },
  
  // April 2023 sessions
  {
    id: '9',
    date: '2023-04-25',
    spot: 'San Onofre',
    board: 'Longboard',
    waveCount: 16,
    mood: 5,
    conditions: {
      swellHeight: 2,
      swellDirection: 'SW',
      wind: 'Calm',
      tide: 'Mid',
    },
    notes: 'Perfect longboard day at San O.'
  },
  {
    id: '10',
    date: '2023-04-19',
    spot: 'Huntington Beach',
    board: 'Shortboard',
    waveCount: 9,
    mood: 2,
    conditions: {
      swellHeight: 3,
      swellDirection: 'W',
      wind: 'Onshore',
      tide: 'High',
    },
    notes: 'Choppy and disorganized conditions.'
  },
  {
    id: '11',
    date: '2023-04-12',
    spot: 'Ventura Point',
    board: 'Mini Mal',
    waveCount: 22,
    mood: 4,
    conditions: {
      swellHeight: 3,
      swellDirection: 'NW',
      wind: 'Offshore',
      tide: 'Low',
    },
    notes: 'Mini mal was the perfect call today.'
  },
  {
    id: '12',
    date: '2023-04-05',
    spot: 'Zuma Beach',
    board: 'Shortboard',
    waveCount: 11,
    mood: 3,
    conditions: {
      swellHeight: 4,
      swellDirection: 'W',
      wind: 'Cross-shore',
      tide: 'Mid',
    },
    notes: 'Inconsistent sets today.'
  },
  
  // March 2023 sessions
  {
    id: '13',
    date: '2023-03-28',
    spot: 'Trestles',
    board: 'Shortboard',
    waveCount: 31,
    mood: 5,
    conditions: {
      swellHeight: 5,
      swellDirection: 'S',
      wind: 'Offshore',
      tide: 'Low',
    },
    notes: 'One of the best days at Lowers!'
  },
  {
    id: '14',
    date: '2023-03-21',
    spot: 'Blacks Beach',
    board: 'Gun',
    waveCount: 8,
    mood: 4,
    conditions: {
      swellHeight: 6,
      swellDirection: 'NW',
      wind: 'Offshore',
      tide: 'Mid',
    },
    notes: 'Big day at Blacks. Challenging but fun.'
  },
  {
    id: '15',
    date: '2023-03-14',
    spot: 'Malibu Beach',
    board: 'Longboard',
    waveCount: 14,
    mood: 3,
    conditions: {
      swellHeight: 2,
      swellDirection: 'SW',
      wind: 'Calm',
      tide: 'High',
    },
    notes: 'Small but clean waves.'
  },
  
  // February 2023 sessions
  {
    id: '16',
    date: '2023-02-25',
    spot: 'Rincon Point',
    board: 'Shortboard',
    waveCount: 20,
    mood: 5,
    conditions: {
      swellHeight: 4,
      swellDirection: 'NW',
      wind: 'Offshore',
      tide: 'Low',
    },
    notes: 'Classic Rincon day!'
  },
  {
    id: '17',
    date: '2023-02-18',
    spot: 'Ocean Beach SF',
    board: 'Shortboard',
    waveCount: 12,
    mood: 2,
    conditions: {
      swellHeight: 5,
      swellDirection: 'W',
      wind: 'Onshore',
      tide: 'Mid',
    },
    notes: 'Cold, foggy and challenging.'
  },
  {
    id: '18',
    date: '2023-02-10',
    spot: 'Pacifica',
    board: 'Funboard',
    waveCount: 16,
    mood: 3,
    conditions: {
      swellHeight: 3,
      swellDirection: 'NW',
      wind: 'Cross-shore',
      tide: 'High',
    },
    notes: 'Decent winter session.'
  },
  
  // January 2023 sessions
  {
    id: '19',
    date: '2023-01-28',
    spot: 'Steamer Lane',
    board: 'Shortboard',
    waveCount: 15,
    mood: 4,
    conditions: {
      swellHeight: 6,
      swellDirection: 'NW',
      wind: 'Offshore',
      tide: 'Mid',
    },
    notes: 'Big winter NW swell hitting.'
  },
  {
    id: '20',
    date: '2023-01-15',
    spot: 'Huntington Beach',
    board: 'Foamie',
    waveCount: 10,
    mood: 1,
    conditions: {
      swellHeight: 1,
      swellDirection: 'SW',
      wind: 'Onshore',
      tide: 'High',
    },
    notes: 'Extremely flat and blown out.'
  },
  {
    id: '21',
    date: '2023-01-05',
    spot: 'Mavericks',
    board: 'Gun',
    waveCount: 3,
    mood: 5,
    conditions: {
      swellHeight: 12,
      swellDirection: 'NW',
      wind: 'Offshore',
      tide: 'Mid',
    },
    notes: 'Biggest day I\'ve ever surfed.'
  },
  
  // December 2022 sessions
  {
    id: '22',
    date: '2022-12-26',
    spot: 'San Onofre',
    board: 'SUP',
    waveCount: 24,
    mood: 4,
    conditions: {
      swellHeight: 2,
      swellDirection: 'SW',
      wind: 'Calm',
      tide: 'High',
    },
    notes: 'Post-holiday SUP session.'
  },
  {
    id: '23',
    date: '2022-12-15',
    spot: 'Pleasure Point',
    board: 'Fish',
    waveCount: 18,
    mood: 4,
    conditions: {
      swellHeight: 3,
      swellDirection: 'W',
      wind: 'Offshore',
      tide: 'Low',
    },
    notes: 'Love this spot with a fish board.'
  },
  {
    id: '24',
    date: '2022-12-01',
    spot: 'Trestles',
    board: 'Shortboard',
    waveCount: 26,
    mood: 5,
    conditions: {
      swellHeight: 4,
      swellDirection: 'SW',
      wind: 'Offshore',
      tide: 'Mid',
    },
    notes: 'Perfect December day.'
  },
  
  // November 2022 sessions
  {
    id: '25',
    date: '2022-11-20',
    spot: 'Malibu Beach',
    board: 'Mini Mal',
    waveCount: 19,
    mood: 3,
    conditions: {
      swellHeight: 2,
      swellDirection: 'W',
      wind: 'Calm',
      tide: 'Mid',
    },
    notes: 'Fun autumn session.'
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
    try {
      // Always initialize with sample data first for demonstration purposes
      setSessions(sampleSessions);
      
      if (typeof window !== 'undefined') {
        const storedSessions = window.localStorage.getItem('surfSessions');
        // Only use stored sessions if they exist AND they're not empty array
        if (storedSessions) {
          const parsedSessions = JSON.parse(storedSessions);
          // Make sure we don't override with an empty array
          if (parsedSessions && parsedSessions.length > 0) {
            setSessions(parsedSessions);
          }
        }
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
      // If there's any error, fall back to sample data
      setSessions(sampleSessions);
    }
  }, []);

  // Save sessions to localStorage whenever sessions change
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // Only save to localStorage if we have sessions (don't overwrite with empty array)
        if (sessions.length > 0) {
          window.localStorage.setItem('surfSessions', JSON.stringify(sessions));
        }
      }
    } catch (error) {
      console.error('Error saving sessions:', error);
    }
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
    console.log('Getting stats, sessions length:', sessions.length);
    
    if (sessions.length === 0) {
      console.log('No sessions available for stats');
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
      
    // Calculate mood trend over time - showing last 15 sessions for more comprehensive trend
    const last15Sessions = [...sessions]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-15);
    const moodTrend = last15Sessions.map(session => ({
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
