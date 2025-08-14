import { API_BASE } from '@/conf/http';
import { getHeader } from '../utils';
import { InventoryResolution } from '@/entities/InventoryResolution.entity';
import { ResolutionInventory } from '@/entities/ResolutionInventory.entity';
import { getBody } from './utils';

const client = async (resolutionInventory: ResolutionInventory): Promise<InventoryResolution[]> => {
  const url = `${API_BASE}/resolutions/${resolutionInventory.id}/inventory`;
  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
    method: 'PATCH',
    body: getBody(resolutionInventory),
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
