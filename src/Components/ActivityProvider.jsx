import React from 'react';
import { useUserActivity } from '../hooks/useUserActivity';

export const ActivityProvider = ({ children }) => {
  useUserActivity(30000);
  
  return <>{children}</>;
};