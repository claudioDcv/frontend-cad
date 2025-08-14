import { createContext } from 'react';
import { Alert } from './types';

interface AlertContextProps {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id'>) => void;
  removeAlert: (id: string) => void;
}

export const AlertContext = createContext<AlertContextProps | undefined>(undefined);