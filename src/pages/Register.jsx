import {
  FormControl,
  Alert,
  Box,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  IconButton,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { Email, Visibility, VisibilityOff } from '@mui/icons-material';
import { useRegisterUserMutation } from '../services/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../slices/authSlice';
import { AuthLayout } from '../Layout/AuthLayout';

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [firstnameValue, setFirstnameValue] = useState('');
  const [lastnameValue, setLastnameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [jobValue, setJobValue] = useState('');
  const [password, setPassword] = useState('');
  const [registerUser] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRegisterError(null);
    try {
      const result = await registerUser({
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        job: jobValue,
        password,
      }).unwrap();
      if (result && result.isSuccess && result.result && result.result.email != null) {
        dispatch(register());
        navigate('/login', {
          replace: true,
          state: { message: 'Your profile has been successfully created, check your email.' },
        });
      } else {
        setRegisterError(result.data.message || result.ErrorMessages);
      }
    } catch (err) {
      console.log(err);
      console.log(err.data.ErrorMessages[0]);
      if (err?.data?.displayMessage) {
        setRegisterError(err.data.displayMessage);
      } else {
        setRegisterError(err.data.ErrorMessages[0]);
      }
    }
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Start your journey"
      links={
        <span>
          Already have an account? <Link to="/login">Sign In</Link>
        </span>
      }
    >
      <form className="form" onSubmit={handleSubmit}>
        {registerError && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {registerError}
          </Alert>
        )}
        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-weight">Firstname</InputLabel>
          <OutlinedInput
            value={firstnameValue}
            onChange={(e) => setFirstnameValue(e.target.value)}
            id="outlined-adornment-weight"
            aria-describedby="outlined-weight-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-weight">Lastname</InputLabel>
          <OutlinedInput
            value={lastnameValue}
            onChange={(e) => setLastnameValue(e.target.value)}
            id="outlined-adornment-weight"
            aria-describedby="outlined-weight-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-weight">Job</InputLabel>
          <OutlinedInput
            value={jobValue}
            onChange={(e) => setJobValue(e.target.value)}
            required={true}
            id="outlined-adornment-weight"
            aria-describedby="outlined-weight-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-weight">Email</InputLabel>
          <OutlinedInput
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
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
            required={true}
            label="Password"
          />
        </FormControl>
        <Button variant="contained" type="submit" sx={{ m: 1, width: '100%' }}>
          Sign Up
        </Button>
      </form>
    </AuthLayout>
  );
}
