import { API_BASE } from '@/conf/http';
import { clearAllProps, clearProp, getHeader, pageableToPaginated } from '../utils';
import { NotificationQuery } from './index.types';
import { Paginated } from '../types';
import { Notification } from '@/entities/Notification.entity';

const client = async (props: NotificationQuery): Promise<Paginated<Notification>> => {
  const params = {
    page: clearProp(props.page - 1),
    resolutionNumber: clearProp(props.userId),
    resolutionId: clearProp(props.viewed),
  };

  const query = new URLSearchParams(clearAllProps(params));
  const url = `${API_BASE}/notifications?${query}`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('error.getAllNotificationsFetch');
  }

  try {
    const res = await response.json();
    return pageableToPaginated<Notification>(res);
  } catch {
    throw new Error('error.getAllNotificationsParse');
  }
};

export default client;
