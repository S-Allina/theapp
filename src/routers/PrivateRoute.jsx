import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkAuth, setTheme } from '../slices/authSlice';
import urls from '../../url';

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch(`${urls.AUTH}/api/auth/check-auth`, {
          credentials: 'include', 
        });

        if (response.ok) {
          const authData = await response.json();

          if (authData.isAuthenticated) {
            dispatch(checkAuth.fulfilled(authData));
            dispatch(setTheme(authData?.theme || "dark"));
            
          } else {
            dispatch(checkAuth.rejected());
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        dispatch(checkAuth.rejected());
      } finally {
        setCheckingAuth(false);
      }
    };

    if (!isAuthenticated && !isLoading) {
      verifyAuth();
    } else {
      setCheckingAuth(false);
    }
  }, [isAuthenticated, isLoading, dispatch]);

  if (checkingAuth || isLoading) {
    return <div>Checking authentication...</div>;
  }

  console.log('isAuthenticated', isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
