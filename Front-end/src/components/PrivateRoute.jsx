import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthen } from '../hooks/AuthenContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthen();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00CFC1]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/pharmacie/login" />;
  }

  return children;
};

export default PrivateRoute; 