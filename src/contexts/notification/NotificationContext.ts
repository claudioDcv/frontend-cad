import { createContext } from 'react';
import { NotificationContextValue } from './types';

const initialValue: NotificationContextValue = {
  unviewedCounter: 0,
  setUnviewedCounter: () => undefined,
  add: () => undefined,
  sub: () => undefined,
};

const NotificationContext =
  createContext<NotificationContextValue>(initialValue);

export default NotificationContext;
