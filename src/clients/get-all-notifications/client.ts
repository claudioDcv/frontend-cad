import { API_BASE } from '@/conf/http';
import { clearAllProps, clearProp, getHeader } from '../utils';
import { NotificationQuery } from './index.types';
import { remap } from './utils';

const client = async (props: NotificationQuery) => {
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
    return remap(res);
  } catch {
    throw new Error('error.getAllNotificationsParse');
  }
};

export default client;
