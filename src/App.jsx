import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Users from './pages/Users';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AuthInitializer } from './Components/AuthInitializer';
import { PrivateRoute } from './routers/PrivateRoute';
import { Header } from './Components/Header';
import { ActivityProvider } from './Components/ActivityProvider';
import { ResetPassword } from './pages/ResetPassword';
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <AuthInitializer>
            <Route element={<PrivateRoute />}>
              <Route
                path="/"
                element={
                  <>
                    {/* <ActivityProvider> */}
                    <Header />
                    <Users />
                    {/* </ActivityProvider> */}
                  </>
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </AuthInitializer>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
