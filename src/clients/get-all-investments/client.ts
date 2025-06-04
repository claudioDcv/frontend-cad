import { API_BASE } from '../../conf/http';
import { getHeader } from '../utils';
import { Investment } from './types';

const client = async (): Promise<Investment[]> => {
  const url = `${API_BASE}/investments`;
  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export default client;
