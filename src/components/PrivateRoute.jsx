import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Check if token exists
const PrivateRoute = () => {
  const token = localStorage.getItem('authToken');
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;