import { useLogoutUserMutation } from '../services/authApi';
import { logout } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

export function Header() {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <Box sx={{ display: 'flex', maxHeight:'10vh' ,justifyContent: 'space-between', alignItems: 'center', p: 3, boxSizing:'border-box' , borderBottom: 1, borderColor: 'divider' }}>
      <Typography variant="h6">The app</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography>{user?.email}</Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}