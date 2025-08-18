import { API_BASE } from '@/conf/http';
import { getHeader } from '../utils';
import { InventoryResolution } from '@/entities/InventoryResolution.entity';

const client = async (resolutionId: number): Promise<InventoryResolution[]> => {
  const url = `${API_BASE}/resolutions/${resolutionId}/resolve`;
  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error('error.patchResolutionResolveFetch');
  }

  try {
    const data = await response.json();
    if (!data.resolutionNumber) {
      throw new Error('error.patchResolutionResolveParse');
    }
    return data;
  } catch {
    throw new Error('error.patchResolutionResolveParse');
  }
};

export default client;
