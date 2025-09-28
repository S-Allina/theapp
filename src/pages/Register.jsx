import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Visibility, VisibilityOff, Email } from '@mui/icons-material';
import { useState } from 'react';
import styled from 'styled-components';

export function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <StyledWrapper>
      <div className="center">
        <div className="content-wrapper">
          <div className="logo"></div>
          <div className="form-section">
            <h6 className="subtitle">Start your journey</h6>
            <h2 className="title">Sign In to The App</h2>
            <form className="form">
              <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-weight">Firstname</InputLabel>
                <OutlinedInput
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
              <Button variant="contained" sx={{ m: 1, width: '100%' }}>
                Contained
              </Button>
            </form>
          </div>
        </div>
        <div class="my-container"></div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .center {
    display: flex;
    justify-content: center;
    width: 100vw;
    text-align: center;
  }
  .my-container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-sizing: border-box;
    width: 50%;
    background-image: url('/img/background.png');
    min-height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .content-wrapper {
    padding: 3rem;
    box-sizing: border-box;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .logo {
    width: 35%;
    height: 7%;
    background-image: url('/img/logo.png');
    background-size: contain;
    background-repeat: no-repeat;
    margin: 0;
  }

  .form-section {
    padding: 3rem;
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .subtitle {
    color: #6c757d;
    font-weight: 300;
    text-align: left;
    margin: 0;
    font-size: 1rem;
  }

  .title {
    color: #000;
    text-align: left;
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
  }

  .form {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Дополнительные стили */
  .field-icon {
    float: right;
    margin-right: 10px;
    margin-top: -55px;
    position: relative;
    z-index: 2;
  }

  .fit-content {
    width: fit-content;
  }

  a:hover {
    cursor: pointer;
  }

  .my-control-label {
    display: flex;
    align-items: center;
    position: relative;
    font-size: 0.8em;
    top: -45px;
    width: 100%;
    left: 4%;
    color: #969696;
  }

  .my-form-control {
    font-size: 1em;
    padding: 1rem 1.3rem 0.3rem 1rem;
    color: black;
  }

  .container1 {
    padding-top: 50px;
    margin: auto;
  }

  .p-6 {
    padding: 3% 5% !important;
  }

  .p-20 {
    padding: 15% 20% 10%;
  }

  .fs-0 {
    font-size: 12px;
  }
`;
