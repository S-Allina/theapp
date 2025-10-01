import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;