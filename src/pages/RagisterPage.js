import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow digits for mobile
    if (name === 'mobile') {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, mobile, password } = formData;

    if (!name || !email || !mobile || !password) {
      alert('Please fill out all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email');
      return;
    }

    if (mobile.length !== 10) {
      alert('Mobile number must be exactly 10 digits');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    dispatch(registerUser({ name, email, mobile, password }));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      alert('Registration successful! Please log in.');
      setFormData({ name: '', email: '', mobile: '', password: '' });
      navigate('/login');
    }
  }, [status, navigate]);

  const isFormValid = formData.name && formData.email && formData.mobile && formData.password;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={2}
    >
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        width={{ xs: '100%', sm: '400px', md: '800px' }}
        height={{ xs: 'auto', md: '500px' }}
        boxShadow={3}
        borderRadius="8px"
        overflow="hidden"
        bgcolor="white"
      >
        {/* Left side */}
        <Box
          bgcolor="#1c1c1c"
          width={{ xs: '100%', md: '40%' }}
          p={3}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="white"
          textAlign="center"
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Sign Up
          </Typography>
          <Typography variant="body2">
            Register to track your Orders, Wishlist and Recommendations
          </Typography>
        </Box>

        {/* Right side */}
        <Box
          width={{ xs: '100%', md: '60%' }}
          p={3}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleRegister}>
            <TextField
              label="Enter Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="standard"
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label="Enter Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="standard"
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label="Enter Mobile Number"
              name="mobile"
              type="text"
              inputProps={{ maxLength: 10 }}
              value={formData.mobile}
              onChange={handleChange}
              variant="standard"
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label="Enter Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="standard"
              fullWidth
              sx={{ mb: 3 }}
            />

            <Typography variant="caption" color="textSecondary" sx={{ mb: 2 }}>
              By continuing, you agree to E-commerce's{' '}
              <MuiLink href="#" underline="hover">
                Terms of Use
              </MuiLink>{' '}
              and{' '}
              <MuiLink href="#" underline="hover">
                Privacy Policy
              </MuiLink>.
            </Typography>

            <Button
              variant="contained"
              type="submit"
              disabled={!isFormValid || status === 'loading'}
              sx={{ mt: 2, mb: 1, backgroundColor: '#1c1c1c', color: 'white' }}
            >
              {status === 'loading' ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
            </Button>
          </form>

          <MuiLink href="/login" underline="hover" align="center" sx={{ mt: 2 }}>
            Already have an account? Log in
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
