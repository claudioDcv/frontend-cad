import { useState, useCallback } from 'react';
import NotificationContext from './NotificationContext';
import { NotificationContextValue } from './types';

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [unviewedCounter, setUnviewedCounter] = useState(0);

  const add = useCallback(() => {
    setUnviewedCounter((prev) => prev + 1);
  }, []);

  const sub = useCallback(() => {
    setUnviewedCounter((prev) => prev - 1);
  }, []);

  const value: NotificationContextValue = {
    unviewedCounter,
    setUnviewedCounter,
    add,
    sub,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
