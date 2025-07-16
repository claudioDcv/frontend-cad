import { use } from 'react';
import { NotificationContextValue } from './types';
import NotificationContext from './NotificationContext';

export function useNotification(): NotificationContextValue {
  const context = use(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
}
