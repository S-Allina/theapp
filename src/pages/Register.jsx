import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Visibility, VisibilityOff, Email } from '@mui/icons-material';
import { useState } from 'react';
import { Alert,Box } from '@mui/material';
import { useRegisterUserMutation } from '../services/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../slices/authSlice';

export function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const [firstnameValue, setFirstnameValue] = useState('');
  const [lastnameValue, setLastnameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [jobValue, setJobValue] = useState('');
  const [password, setPassword] = useState('');
  const [registerUser] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState(null);

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
      console.log('Login result:', result);

      if (result.isSuccess && result.result && result.result.email != null) {
        dispatch(register());
        navigate('/login', { 
            replace: true,
            state: { message: "Ваш профиль успешно создан, проверьте свою почту" } 
        });
      } else {
        console.log(result);
        setRegisterError(result.displayMessage || result.errorMessages);
      }
    } catch (err) {
      if (err?.data?.displayMessage) {
        setRegisterError(err.data.displayMessage);
      } else {
        console.log(err);
        setRegisterError('Неверный формат данных.');
      }
    }
  };

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
            <h6 className="subtitle">Start your journey</h6>
            <h2 className="title">Sign In to The App</h2>
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
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-weight">Lastname</InputLabel>
                <OutlinedInput
                  value={lastnameValue}
                  onChange={(e) => setLastnameValue(e.target.value)}
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
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
                  inputProps={{
                    'aria-label': 'weight',
                  }}
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
                  required={true}
                  label="Password"
                />
              </FormControl>
              <Button variant="contained" type='submit' sx={{ m: 1, width: '100%' }}>
                Sing Up
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
            <a href="/forgot-password">Forgot password?</a>
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
