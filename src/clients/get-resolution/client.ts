import { Resolution } from '@/entities/Resolution.entity';
import { API_BASE } from '@/conf/http';
import { getHeader } from '../utils';

const client = async (id: number | string): Promise<Resolution | null> => {
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
