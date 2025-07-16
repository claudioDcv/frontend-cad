import { Dispatch, SetStateAction } from 'react';

export interface NotificationContextValue {
  unviewedCounter: number;
  setUnviewedCounter: Dispatch<SetStateAction<number>>;
  add: () => void;
  sub: () => void;
}
