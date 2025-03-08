import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token'); // Check if token exists in localStorage

  // If there's no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If there's a token, render the component
  return <Component {...rest} />;
};

export default ProtectedRoute;
