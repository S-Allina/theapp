import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../slices/authSlice';

const ThemeToggle = () => {
  const theme = useSelector((state) => state.auth.theme);
  // Нормализуем тему с обработкой undefined
  const normalizedTheme = theme?.toLowerCase() || 'light';
  
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Tooltip title={`Switch to ${normalizedTheme === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton onClick={handleToggle} color="inherit">
        {normalizedTheme === 'light' ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;