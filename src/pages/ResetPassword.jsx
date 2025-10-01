import { useState } from 'react';
import { useForgotPasswordMutation, useResetPasswordMutation } from '../services/authApi';
import { useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Alert,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import { Email, Visibility, VisibilityOff } from '@mui/icons-material';

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const emailFromUrl = searchParams.get('email');
const navigate = useNavigate();
  const [step] = useState(token && emailFromUrl ? 2 : 1);
  const [email, setEmail] = useState(emailFromUrl || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [forgotPassword] = useForgotPasswordMutation();
  const [resetPassword] = useResetPasswordMutation();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      const result = await forgotPassword({ email }).unwrap();

      if (result==true) {
        setMessage('Password reset instructions have been sent to your email.');
      } else {
        setError(result.displayMessage || 'Failed to send reset email');
      }
    } catch (err) {
      setError(err || 'Failed to send reset email');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (!newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (email !== emailFromUrl) {
      setError('Email verification failed');
      return;
    }

    try {
      const result = await resetPassword({
        email,
        newPassword,
        token,
      }).unwrap();

      if (result.isSuccess) {
      setMessage('Password has been reset successfully!');
      navigate('/login?message=Password change is success.');
    } else {
      setError(result.displayMessage || 'Failed to reset password');
    }
  } catch (err) {
    setError(err?.data?.displayMessage || 'Failed to reset password');
  }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
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
            style={{
              textAlign: 'left',
              margin: 0,
              color: '#6c757d',
              fontWeight: 300,
              fontSize: '1rem',
            }}
          >
            {step === 1 && 'Enter your email to reset password'}
            {step === 2 && 'Enter your new password'}
            {step === 3 && 'Password reset successful'}
          </h6>

          <h2
            style={{
              textAlign: 'left',
              margin: '0 0 1rem 0',
              color: '#000',
              fontSize: '1.5rem',
            }}
          >
            {step === 1 && 'Reset Password'}
            {step === 2 && 'Set New Password'}
            {step === 3 && 'Success!'}
          </h2>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          {message && (
            <Alert severity="success" sx={{ marginBottom: 2 }}>
              {message}
            </Alert>
          )}
          {step === 1 && (
            <form
              style={{
                marginTop: '3rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onSubmit={handleSendEmail}
            >
              <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="email-input">Email</InputLabel>
                <OutlinedInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email-input"
                  type="email"
                  endAdornment={
                    <InputAdornment position="end">
                      <Email />
                    </InputAdornment>
                  }
                  label="Email"
                />
              </FormControl>
              <Button variant="contained" type="submit" sx={{ m: 1, width: '100%' }}>
                Send Reset Link
              </Button>
            </form>
          )}

          {step === 2 && (
            <form
              style={{
                marginTop: '3rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onSubmit={handleResetPassword}
            >
              <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="new-password">New Password</InputLabel>
                <OutlinedInput
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? 'hide password' : 'show password'}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="New Password"
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                <OutlinedInput
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showConfirmPassword ? 'hide password' : 'show password'}
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>

              <Button variant="contained" type="submit" sx={{ m: 1, width: '100%' }}>
                Save New Password
              </Button>
            </form>
          )}
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
            Remember your password? <a href="/login">Sign In</a>
          </span>
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
