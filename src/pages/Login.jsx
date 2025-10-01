import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState, useEffect } from 'react';
import { Alert, Box } from '@mui/material';
import { useLoginUserMutation } from '../services/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Email from '@mui/icons-material/Email';
import { login } from '../slices/authSlice';
import { useLocation, useSearchParams } from 'react-router-dom';

export function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const message = searchParams.get('message');
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const [loginValue, setloginValue] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [loginError, setLoginError] = useState(null);

  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state) => state.auth.isLoading);

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
      console.log('Login result:', result);

      if (result.isSuccess) {
        dispatch(login(result.result));
        navigate('/', { replace: true });
      } else {
        console.log(result);
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
    return <h2>Load</h2>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100vw',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          padding: '5rem',
          boxSizing: 'border-box',
          width: '50vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            width: '35%',
            height: '7%',
            backgroundSize: 'contain',
            backgroundImage: "url('../../public/img/logo.png')",
            backgroundRepeat: 'no-repeat',
            margin: 0,
          }}
        />
        <Box
          sx={{
            padding: '5rem',
            width: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <h6
            className="subtitle"
            style={{
              textAlign: 'left',
              margin: 0,
              color: '#6c757d',
              fontWeight: 300,
              fontSize: '1rem',
            }}
          >
            Start your journey
          </h6>
          <h2
            className="title"
            style={{ textAlign: 'left', margin: '0 0 1rem 0', color: '#000', fontSize: '1.5rem' }}
          >
            Sign In to The App
          </h2>
          <form
            className="form"
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
                inputProps={{
                  'aria-label': 'weight',
                }}
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
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '0 1rem',
            marginTop: '1rem',
            boxSizing: 'border-box',
          }}
        >
          <span>
            You don't have account? <a href="/register">Регистрация</a>
          </span>
          <a href="/reset-password">Forgot password?</a>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          boxSizing: 'border-box',
          width: '50%',
          backgroundImage: "url('../../public/img/background.png')",
          minHeight: '100vh',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </Box>
  );
}
