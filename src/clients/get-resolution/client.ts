import { API_BASE } from '../../conf/http';
import { getHeader } from '../utils';
import { Resolution } from './types';

const client = async (id: string): Promise<Resolution | null> => {
  const url = new URL(`${API_BASE}/resolutions/${id}`);

  const response = await fetch(url.toString(), {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('error.getResolutionFetch');
  }

  try {
    const result = await response.json();
    return result;
  } catch {
    throw new Error('error.getResolutionFetch');
  }
};

export default client;
