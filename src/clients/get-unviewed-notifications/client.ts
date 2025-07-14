import { API_BASE } from '@/conf/http';
import { getHeader } from '../utils';

const client = async () => {
  const url = `${API_BASE}/notifications/unviewed`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('error.getAllUnviewedNotificationsFetch');
  }

  try {
    return await response.json();
  } catch {
    throw new Error('error.getAllUnviewedNotificationsParse');
  }
};

export default client;
