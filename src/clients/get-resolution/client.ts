import { API_BASE } from '../../conf/http';
import { getHeader } from '../utils';
import { Resolution } from './types';

const client = async (id: string): Promise<Resolution | null> => {
  const url = new URL(`${API_BASE}/resolutions`);

  url.searchParams.append('resolutionId', id);

  const response = await fetch(url.toString(), {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  try {
    const data = await response.json();

    if (data.content && data.content.length > 0) {
      return data.content[0];
    }

    return null;
  } catch {
    throw new Error('Failed to parse JSON response');
  }
};

export default client;
