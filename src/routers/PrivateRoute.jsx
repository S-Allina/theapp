import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkAuth } from '../slices/authSlice';
import {Box, CircularProgress, Typography } from '@mui/material';

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await dispatch(checkAuth());
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setCheckingAuth(false);
      }
    };

    if (!isAuthenticated) {
      verifyAuth();
    } else {
      setCheckingAuth(false);
    }
  }, [isAuthenticated, dispatch]);

  if (checkingAuth || isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Checking authentication...
        </Typography>
      </Box>
    );
  }

  console.log('Current user:', user); // Теперь здесь полная информация о пользователе
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};