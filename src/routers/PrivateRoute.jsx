import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
export const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);
const location = useLocation();
  if (isLoading) {
    return <div>Loading...</div>;
  }

    if (
    !isAuthenticated &&
    !location.pathname.includes('/reset-password') &&
    !location.pathname.startsWith('/register')
  ) {
    console.log(location.pathname)
    return <Navigate to="/login" replace />;
  }
console.log(location.pathname)
  return <Outlet />;
};
