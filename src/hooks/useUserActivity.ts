import { useEffect, useRef, useCallback } from 'react';
import { useUpdateActivityMutation } from '../services/usersApi';
import { useSelector } from 'react-redux';

export const useUserActivity = (interval = 30000) => {
  const [updateActivity] = useUpdateActivityMutation();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
 
    const handleActivity = useCallback(async () => {
      const now = Date.now();

      if (now - lastUpdateRef.current > 30000 && isAuthenticated) {
        try {
          await updateActivity().unwrap();
          console.log(isAuthenticated)
          lastUpdateRef.current = now;
        } catch (error) {
          console.log(isAuthenticated)
          console.warn('Failed to update activity:', error);
        }
      }
    }, [updateActivity]);

    useEffect(() => {
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

      const handleUserEvent = () => {
        handleActivity();
      };

      events.forEach((event) => {
        document.addEventListener(event, handleUserEvent, { passive: true });
      });

      intervalRef.current = setInterval(handleActivity, interval);

      return () => {
        events.forEach((event) => {
          document.removeEventListener(event, handleUserEvent);
        });
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [handleActivity, interval]);

    return { updateActivity: handleActivity };
  // }
};
