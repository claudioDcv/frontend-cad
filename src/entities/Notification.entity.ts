export interface Notification {
  timestamp: number;
  type: string;
  message: string;
  userName: string;
  userId: number;
  notificationId: number;
  entity: string;
  entityId: number;
}
