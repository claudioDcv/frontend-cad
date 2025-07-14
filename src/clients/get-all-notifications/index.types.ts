import { Notification } from '@/entities/Notification.entity';
import { Pageable, Sort } from '../types';

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

export type NotificationPaginated = {
  notifications: Notification[];
  meta: {
    page: number;
    count: number;
  };
};

export type PageResponse = {
  totalPages: number;
  totalElements: number;
  pageable: Pageable;
  size: number;
  content: Notification[];
  number: number;
  sort: Sort[];
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
};
