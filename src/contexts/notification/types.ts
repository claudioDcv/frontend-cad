export interface NotificationContextValue {
  unviewedCounter: number;
  setUnviewedCounter: (counter: number) => void;
  add: () => void;
  sub: () => void;
}
