import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Users from './pages/Users';
import { Provider, useSelector } from 'react-redux';
import { store } from './app/store';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import PrivateRoute from './routers/PrivateRoute';
import { Header } from './Components/Header';
import { ResetPassword } from './pages/ResetPassword';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setTheme } from './slices/authSlice';
const ThemeWrapper = ({ children }) => {
  const themeMode = useSelector((state) => state.auth.theme);
  const state = useSelector((state) => state);
  const normalized = 'light';
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      // updateTheme({ theme: themeMode });
    }
  }, [themeMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      mode: normalized,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router basename="/theapp">
        <ThemeWrapper>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route
                path="/profile"
                element={
                  <>
                    <Header />

                    <UserProfilePage />
                  </>
                }
              />
              <Route
                path="/users"
                element={
                  <>
                    <Header />
                    <Users />
                  </>
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ThemeWrapper>
      </Router>
    </Provider>
  );
};

export default App;
