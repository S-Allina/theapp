import { useLogoutUserMutation } from '../services/authApi';
import { logout } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import ThemeToggle from './ThemeToggle';
import urls from '../../url';

export function Header() {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } finally {
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <Box sx={{ display: 'flex', maxHeight:'10vh' ,justifyContent: 'space-between', alignItems: 'center', p: 3, boxSizing:'border-box' , borderBottom: 1, borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant="h6">The app</Typography>
       <a href={urls.MAIN} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
  <Button variant="text" sx={{ textTransform: 'none' }}>
    Inventories
  </Button>
</a>
</Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography>{user?.email}</Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
        <ThemeToggle/>
      </Box>
    </Box>
  );
}