import { useEffect, useRef, useCallback } from 'react';
import { useUpdateActivityMutation } from '../services/usersApi';
import { useSelector } from 'react-redux';

export const useUserActivity = (interval = 30000) => {
  const [updateActivity] = useUpdateActivityMutation();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  const handleActivity = useCallback(async () => {
    if (!isAuthenticated)  return;

    const now = Date.now();
        if (now - lastUpdateRef.current >= interval) {
      try {
        await updateActivity().unwrap();
        lastUpdateRef.current = now;
      } catch (error) {
        console.warn('Failed to update activity:', error);
      }
    }
  }, [updateActivity, isAuthenticated, interval]);

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