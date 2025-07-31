import { API_BASE } from '../../conf/http';
import { getHeader } from '../utils';
import { InventoryTypeResponse } from './types';

const client = async (): Promise<InventoryTypeResponse[]> => {
  const url = `${API_BASE}/inventory-types/all`;
  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('error.getAllInventoryTypesFetch');
  }

  try {
    return response.json();
  } catch {
    throw new Error('error.getAllInventoryTypesParse');
  }
};

export default client;
