import { mapMeta } from '../utils';
import { NotificationPaginated, PageResponse } from './index.types';

export const remap = (data: PageResponse): NotificationPaginated => ({
  notifications: data.content,
  meta: mapMeta(data),
});

export const initialNotificationData: NotificationPaginated = {
  notifications: [],
  meta: {
    page: 0,
    count: 0,
  },
};
