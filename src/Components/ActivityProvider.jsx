import { useUserActivity } from '../hooks/useUserActivity';
import { useSelector } from 'react-redux';

export const ActivityProvider = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useUserActivity(isAuthenticated ? 30000 : 0);

  return <>{children}</>;
};
