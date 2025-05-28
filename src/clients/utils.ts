import { getToken } from '../hooks/useJWTNotification';

export const getHeader = () => {
  const key = getToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `${key}`,
  };

  return headers;
};