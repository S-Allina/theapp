import {
  FormControl,
  Alert,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  IconButton,
  Button,
  Box
} from '@mui/material';
import { Email, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLoginUserMutation } from '../services/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authSlice';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { AuthLayout } from '../Layout/AuthLayout';
import GoogleIcon from '@mui/icons-material/Google';
import urls from '../../url';
export function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const message = searchParams.get('message');
  const errorFromPath = searchParams.get('error');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginUser] = useLoginUserMutation();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  
  const r = searchParams.get('returnUrl');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (r) {
      const decodedReturnUrl = decodeURIComponent(r);
      localStorage.setItem('oidc_return_url', decodedReturnUrl);
    }
  }, [r]);

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

const handleGoogleLogin = () => {
  const clientId = "MainMVCApp";
  const redirectUri = `${urls.MAIN}/signin-oidc`;
  const scope = "openid profile email api1";
  
  const authUrl = `${urls.AUTH}/connect/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&prompt=login`;
  
  window.location.href = authUrl;
};

  const onSubmit = async (data) => {
    setLoginError(null);
    try {
      const savedReturnUrl = localStorage.getItem('oidc_return_url');
      const finalReturnUrl = savedReturnUrl || `/connect/authorize?client_id=MainMVCApp&redirect_uri=${urls.MAIN}/signin-oidc&response_type=code&scope=openid profile email api1`;
      
      const result = await loginUser({ 
        email: data.email, 
        password: data.password, 
        returnUrl: finalReturnUrl 
      }).unwrap();

      console.log('in jsx', result);

      if (result.returnUrl) {
        dispatch(login(result.result));
        
        localStorage.removeItem('oidc_return_url');
        
        window.location.href = `${urls.AUTH}${result.returnUrl}`;
      } else {
        setLoginError(result?.errorMessages || result.displayMessage);
      }
    } catch (err) {
      if (err?.data?.displayMessage || err?.errorMessages) {
        setLoginError(err.data.displayMessage || err.errorMessages);
      } else {
        setLoginError('Incorrect login or password.');
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
            You don't have account? <Link to="/register">Sign Up</Link>
          </span>
          <Link to="/reset-password">Forgot password?</Link>
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
        onSubmit={handleSubmit(onSubmit)}
      >
        {(loginError || errorFromPath) && (
          <Alert severity="error" sx={{ marginBottom: 2, width: '100%' }}>
            {loginError || errorFromPath}
          </Alert>
        )}
        {loginMessage && (
          <Alert severity="success" sx={{ marginBottom: 2, width: '100%' }}>
            {loginMessage}
          </Alert>
        )}
        
        <FormControl 
          sx={{ m: 1, width: '100%' }} 
          variant="outlined"
          error={!!errors.email}
        >
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            id="email"
            type="email"
            {...register("email", {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            endAdornment={
              <InputAdornment position="end">
                <Email />
              </InputAdornment>
            }
            label="Email"
          />
          {errors.email && (
            <Alert severity="error" sx={{ mt: 1, fontSize: '0.75rem' }}>
              {errors.email.message}
            </Alert>
          )}
        </FormControl>

        <FormControl 
          sx={{ m: 1, width: '100%' }} 
          variant="outlined"
          error={!!errors.password}
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register("password", {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
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
          {errors.password && (
            <Alert severity="error" sx={{ mt: 1, fontSize: '0.75rem' }}>
              {errors.password.message}
            </Alert>
          )}
        </FormControl>

        <Button 
          variant="contained" 
          type="submit" 
          sx={{ m: 1, width: '100%' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </AuthLayout>
  );
}