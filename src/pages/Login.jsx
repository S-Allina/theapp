import {
  FormControl,
  Alert,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  IconButton,
  Button,
} from '@mui/material';
import { Email, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useLoginUserMutation } from '../services/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authSlice';
import { useLocation, Link, useSearchParams, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../Layout/AuthLayout';

export function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const message = searchParams.get('message');
  const [showPassword, setShowPassword] = useState(false);
  const [loginValue, setloginValue] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginUser] = useLoginUserMutation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (message) {
      setLoginMessage(message);
      searchParams.delete('message');
      setSearchParams(searchParams);
    }
  }, [message, searchParams, setSearchParams]);

  useEffect(() => {
    if (location.state?.message) {
      setLoginMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError(null);
    try {
      const result = await loginUser({ email: loginValue, password }).unwrap();

      if (result.isSuccess) {
        dispatch(login(result.result));
        navigate('/', { replace: true });
      } else {
        setLoginError(result.displayMessage || result.errorMessages);
      }
    } catch (err) {
      if (err?.data?.displayMessage) {
        setLoginError(err.data.displayMessage);
      } else {
        console.log(err);
        setLoginError('Неверный логин или пароль.');
      }
    }
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <AuthLayout
      title="Sign In to The App"
      subtitle="Start your journey"
      links={
        <>
          <span>
            You don't have account? <Link to="/register">Регистрация</Link>
          </span>
          <Link to="/forgot-password">Forgot password?</Link>
        </>
      }
    >
      <form
        style={{
          marginTop: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onSubmit={handleSubmit}
      >
        {loginError && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {loginError}
          </Alert>
        )}
        {loginMessage && (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            {loginMessage}
          </Alert>
        )}
        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-weight">Email</InputLabel>
          <OutlinedInput
            value={loginValue}
            onChange={(e) => setloginValue(e.target.value)}
            id="outlined-adornment-weight"
            endAdornment={
              <InputAdornment position="end">
                <Email />
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'hide the password' : 'display the password'}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button variant="contained" type="submit" sx={{ m: 1, width: '100%' }}>
          Sign In
        </Button>
      </form>
    </AuthLayout>
  );
}
