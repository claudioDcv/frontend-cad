import { API_BASE } from '@/conf/http';
import { getHeader } from '../utils';
import { InventoryResolution } from '@/entities/InventoryResolution.entity';

const client = async (resolutionId: string): Promise<InventoryResolution[]> => {
  const url = `${API_BASE}/resolutions/${resolutionId}/inventory`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error('error.getAllContractsFetch');
  }

  try {
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('error.getAllContractsParse');
    }
    return data;
  } catch {
    throw new Error('error.getAllContractsParse');
  }
};

export default client;
