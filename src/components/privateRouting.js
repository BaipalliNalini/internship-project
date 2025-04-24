import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'; // Import PropTypes

const PrivateRoute = ({ element }) => {
  const { user } = useSelector((state) => state.auth); 

  if (!user) {
    // Redirect to login page if user is not logged in
    return <Navigate to="/login" replace />;
  }

  return element; // If user is logged in, render the element
};

// Define prop types for validation
PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired, // `element` should be a React element
};

export default PrivateRoute;
