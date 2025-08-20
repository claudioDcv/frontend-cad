import { API_BASE } from '../../conf/http';
import { Resolution } from '@/entities/Resolution.entity';
import { getHeader } from '../utils';

const client = async (resolutionId: number): Promise<Resolution> => {
  const url = `${API_BASE}/resolutions/${resolutionId}/send`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error('error.patchSendResolutionFetch');
  }

  try {
    return response.json();
  } catch {
    throw new Error('error.patchSendResolutionParse');
  }
};

export default client;
