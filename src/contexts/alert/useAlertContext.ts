import { useContext } from 'react';
import { AlertContext } from './AlertContext';
import { Alert } from './types';

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    return {
      // Esto actua como un fallback para los tests
      addAlert: (alert: Omit<Alert, 'id'>) => console.log(alert),
    }
  }
  return context;
};