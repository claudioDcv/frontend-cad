import { API_BASE } from '../../conf/http';
import { getHeader } from '../utils';
import { Status } from './types';

const client = async (): Promise<Status[]> => {
  const url = `${API_BASE}/status`;
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export default client;
