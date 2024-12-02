import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('token'); 

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return element;
};

export default PrivateRoute;




