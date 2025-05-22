import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SessionForm from '../components/SessionForm';
import { useSurfData } from '../data/surfContext';

/**
 * Page for adding a new session or editing an existing one
 */
const NewSessionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addSession, getSessionById, updateSession } = useSurfData();
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialData, setInitialData] = useState(null);
  
  // Check if editing existing session
  useEffect(() => {
    if (id) {
      const session = getSessionById(id);
      if (session) {
        setInitialData(session);
        setIsEditMode(true);
      } else {
        // Session not found, go back to home
        navigate('/');
      }
    }
  }, [id, getSessionById, navigate]);
  
  // Handle form submission
  const handleSubmit = (formData) => {
    if (isEditMode) {
      updateSession(id, formData);
      navigate(`/session/${id}`);
    } else {
      const newSession = addSession(formData);
      navigate(`/session/${newSession.id}`);
    }
  };
  
  return (
    <div className="page">
      <h1 className="title">{isEditMode ? 'Edit Session' : 'Log New Session'}</h1>
      <div className="description">
        {isEditMode ? 'Update your surf session details.' : 'Record details about your surf session.'}
      </div>
      
      <SessionForm 
        initialData={initialData} 
        onSubmit={handleSubmit} 
        formType={isEditMode ? 'edit' : 'add'} 
      />
    </div>
  );
};

export default NewSessionPage;
