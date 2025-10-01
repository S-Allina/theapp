import { Box } from '@mui/material';

export const AuthLayout = ({
  children,
  title = 'Sign In to The App',
  subtitle = 'Start your journey',
  links = null,
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw', textAlign: 'center' }}>
      <Box
        sx={{
          p: '5rem',
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
            backgroundImage: "url('/img/logo.png')",
            backgroundRepeat: 'no-repeat',
            m: 0,
          }}
        />
        <Box
          sx={{
            p: '5rem',
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
            {subtitle}
          </h6>
          <h2
            style={{
              textAlign: 'left',
              margin: '0 0 1rem 0',
              color: '#000',
              fontSize: '1.5rem',
            }}
          >
            {title}
          </h2>
          {children}
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
          {links || (
            <span>
              You don't have account? <a href="/register">Регистрация</a>
            </span>
          )}
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
          backgroundImage: "url('/img/background.png')",
          minHeight: '100vh',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </Box>
  );
};
