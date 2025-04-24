import React, { useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/authSlice';

const Terms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Terms and Conditions';
  }, []);

  const handleAgree = () => {
    const savedData = sessionStorage.getItem('loginData');
    if (savedData) {
      const { email, mobile, password } = JSON.parse(savedData);
      // Dispatch the login action after agreeing to terms
      dispatch(loginUser({ email, mobile, password }));
      sessionStorage.removeItem('loginData'); // Remove the stored data after login
    }
    // Navigate to the home/dashboard page after login
    navigate('/register');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f9f9f9" p={2}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600 }}>
        <Typography variant="h4" gutterBottom>
          Terms and Conditions
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Welcome to our e-commerce platform. By using our services, you agree to be bound by the following terms and conditions:
        </Typography>
        <ul style={{ marginBottom: '1rem' }}>
          <li>You agree to provide accurate and complete information during registration and login.</li>
          <li>You agree not to use the platform for illegal activities.</li>
          <li>Your data may be stored securely for authentication and personalization purposes.</li>
          <li>We reserve the right to update our terms and policies at any time.</li>
        </ul>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Please read and accept our terms to continue using our services.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAgree}>
          I Agree
        </Button>
      </Paper>
    </Box>
  );
};

export default Terms;
