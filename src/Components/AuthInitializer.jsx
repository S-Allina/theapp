import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../slices/authSlice';

export function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return children;
}
