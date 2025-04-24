import React, { useEffect } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/authSlice';

const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  useEffect(() => {
    if (!user && status !== 'loading') {
      navigate('/login');
    }
  }, [user, status, navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h5" gutterBottom>
        Logging you out...
      </Typography>
      <CircularProgress />
    </Box>
  );
};

export default LogoutPage;
