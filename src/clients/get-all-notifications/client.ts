import { clearAllProps, clearProp, pageableToPaginated } from '../utils';
import { NotificationQuery } from './index.types';
import { Paginated } from '../types';
import { Notification } from '@/entities/Notification.entity';
import { getFetch } from '../customFetch';


export default async (query: NotificationQuery): Promise<Paginated<Notification>> => getFetch<Paginated<Notification>>('notifications', {
  query: clearAllProps({
    page: clearProp(query.page - 1),
    viewed: clearProp(query.viewed),
  }),
  remap: pageableToPaginated,
}, {
  responseError: 'error.getAllNotificationsFetch',
  defaultError: 'error.getAllNotificationsParse',
});
