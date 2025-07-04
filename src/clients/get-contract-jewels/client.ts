import { Jewel } from '@/entities/Jewel.entity';
import { API_BASE } from '../../conf/http';
import { getHeader } from '../utils';

const client = async (contractId: number): Promise<Jewel[]> => {
  const url = new URL(`${API_BASE}/contracts/${contractId}/jewels`);

  const response = await fetch(url.toString(), {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('error.getContractJewelsFetch');
  }

  try {
    return await response.json();
  } catch {
    throw new Error('error.getContractJewelsParse');
  }
};

export default client;
