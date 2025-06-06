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

  try {
    return await response.json();
  } catch {
    throw new Error('Failed to parse JSON response');
  }
};

export default client;
