import { API_BASE } from '@/conf/http';
import { getHeader } from '../utils';
import { InventoryResolution } from '@/entities/InventoryResolution.entity';

const client = async (resolutionId: string): Promise<InventoryResolution[]> => {
  const url = `${API_BASE}/resolutions/${resolutionId}/inventory`;

  /*
  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });
  */
  const mockData: InventoryResolution[] = [
    {
      id: 1,
      resolutionId: Number(resolutionId),
      inventoryTypeId: 1,
      inventoryTypeName: null,
      weight: 20,
      quantity: 180,
      totalWeight: 0,
      createdBy: 0,
      updatedBy: 0,
    },
    {
      id: 2,
      resolutionId: Number(resolutionId),
      inventoryTypeId: 2,
      inventoryTypeName: null,
      weight: 44,
      quantity: 1000,
      totalWeight: 0,
      createdBy: 0,
      updatedBy: 0,
    },
  ];

  const response = await (() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData),
    }))();

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
