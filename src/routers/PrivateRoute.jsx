import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && location.pathname !== '/reset-password') {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
