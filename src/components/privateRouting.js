// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
  const { user } = useSelector((state) => state.auth); 

  if (!user) {
    return <Navigate to="/login" />; 
  }

  return element; 
};

export default PrivateRoute;
