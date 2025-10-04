import { useEffect, useRef, useCallback } from 'react';
import { useUpdateActivityMutation } from '../services/usersApi';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
export const useUserActivity = (interval = 30000) => {
  const [updateActivity] = useUpdateActivityMutation();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const location = useLocation();

  const shouldTrackActivity =
    isAuthenticated && location.pathname !== '/register' && location.pathname !== '/login';

  const handleActivity = useCallback(async () => {
    if (!shouldTrackActivity) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    const now = Date.now();
    if (now - lastUpdateRef.current >= interval) {
      try {
        await updateActivity().unwrap();
        lastUpdateRef.current = now;
      } catch (error) {
        console.log(error);
      }
    }
  }, [updateActivity, shouldTrackActivity, interval]);

  useEffect(() => {
    if (!isAuthenticated) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    const handleUserEvent = () => {
      handleActivity();
    };

    events.forEach((event) => {
      document.addEventListener(event, handleUserEvent, { passive: true });
    });

    intervalRef.current = setInterval(handleActivity, interval);

    handleActivity();

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleUserEvent);
      });

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [handleActivity, isAuthenticated, interval]);

  return { updateActivity: handleActivity };
};
