export type NotificationQuery = {
  id?: number;
  type?: string;
  entity?: string;
  entityId?: number;
  userName?: string;
  userId?: number;
  message?: string;
  timestamp?: string;
  viewed?: boolean;
  viewedAt?: string;
  viewedBy?: number;
  page: number;
  size?: number;
  sort?: string;
};
