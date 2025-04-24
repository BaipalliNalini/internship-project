import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from '../features/authSlice';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import PasswordStrengthMeter from './PasswordStrengthMeter';

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, status, error } = useSelector((state) => state.auth);

  // Check if returned from /terms
  useEffect(() => {
    const storedData = sessionStorage.getItem('loginData');
    if (location.pathname === '/login' && !storedData) {
      setAgreedToTerms(true); // Force terms agreement if no stored login data
    }
  }, [location.pathname]);

  useEffect(() => {
    if (status === 'succeeded' && user) {
      alert(`Welcome, ${user.name}!`);
      sessionStorage.removeItem('loginData'); // Clear sessionStorage after successful login
      navigate('/'); // Navigate to home page after successful login
    }
    if (status === 'failed' && error) {
      alert(error);
    }
  }, [status, user, error, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (isRegister) {
      if (!formData.name) newErrors.name = 'Name is required';
    }
    if (!formData.email && !formData.mobile) {
      newErrors.email = 'Please enter email or mobile number';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (isRegister) {
        const { name, email, mobile, password } = formData;
        dispatch(registerUser({ name, email, mobile, password }));
      } else {
        if (!agreedToTerms) {
          sessionStorage.setItem('loginData', JSON.stringify(formData)); // Storing login data temporarily
          navigate('/terms'); // Navigate to the Terms page
        } else {
          const { email, mobile, password } = formData;
          dispatch(loginUser({ email, mobile, password }))
            .then(() => {
              // Clear sessionStorage after successful login
              sessionStorage.removeItem('loginData'); // Clear sessionStorage after successful login
              navigate('/'); // Redirect to home page after successful login
            })
            .catch((error) => {
              console.error('Login failed:', error);
              // Optionally, show an error message or reset sessionStorage if needed
              sessionStorage.removeItem('loginData'); // Clear sessionStorage even on failure
            });
        }
      }
    }
  };

  const switchMode = () => {
    setIsRegister(!isRegister);
    setFormData({ name: '', email: '', mobile: '', password: '' });
    setErrors({});
    setAgreedToTerms(false);
    sessionStorage.removeItem('loginData');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5" p={2}>
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
        {/* Left */}
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
            {isRegister ? 'Sign Up' : 'Login'}
          </Typography>
          <Typography variant="body2">
            {isRegister
              ? 'Register to track your Orders, Wishlist and Recommendations'
              : 'Get access to your Orders, Wishlist and Recommendations'}
          </Typography>
        </Box>

        {/* Right */}
        <Box width={{ xs: '100%', md: '60%' }} p={3} display="flex" flexDirection="column" justifyContent="center">
          {isRegister ? (
            <>
              <TextField
                label="Enter Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="standard"
                fullWidth
                sx={{ mb: 3 }}
                error={Boolean(errors.name)}
                helperText={errors.name}
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
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                label="Enter Mobile Number"
                name="mobile"
                type="tel"
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
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
              <PasswordStrengthMeter password={formData.password} />
              <Typography variant="caption" color="textSecondary" sx={{ mb: 2 }}>
                By continuing, you agree to E-commerce's{' '}
                <MuiLink component={RouterLink} to="/terms" underline="hover">
                  Terms of Use
                </MuiLink>{' '}
                and{' '}
                <MuiLink href="#" underline="hover">
                  Privacy Policy
                </MuiLink>.
              </Typography>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 2, mb: 1, backgroundColor: '#1c1c1c', color: 'white' }}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? <CircularProgress size={24} /> : 'Create Account'}
              </Button>
              <Typography align="center" sx={{ mt: 2 }}>
                Already have an account?{' '}
                <MuiLink component="button" underline="hover" onClick={switchMode} sx={{ fontWeight: 'bold', color: '#1c1c1c' }}>
                  Log in
                </MuiLink>
              </Typography>
            </>
          ) : (
            <>
              <TextField
                label="Enter Email/Mobile number"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="standard"
                fullWidth
                sx={{ mb: 3 }}
                error={Boolean(errors.email)}
                helperText={errors.email}
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
                error={Boolean(errors.password)}
                helperText={errors.password}
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
                onClick={handleSubmit}
                sx={{ mt: 2, mb: 1, backgroundColor: '#1c1c1c', color: 'white' }}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? <CircularProgress size={24} /> : 'Submit'}
              </Button>
              <Typography align="center" sx={{ mt: 2 }}>
                New to E-commerce?{' '}
                <MuiLink component="button" underline="hover" onClick={switchMode} sx={{ fontWeight: 'bold', color: '#1c1c1c' }}>
                  Create an account
                </MuiLink>
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginRegister;
