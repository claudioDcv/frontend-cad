import { API_BASE } from '../../conf/http';
import { Contract } from '@/entities/Contract.entity';
import { getHeader } from '../utils';
import { remap } from './utils';

const client = async (resolutionId: string | number): Promise<Contract[]> => {
  const url = `${API_BASE}/resolutions/${resolutionId}/contracts`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('error.getAllContractsFetch');
  }

  try {
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('error.getAllContractsParse');
    }
    return remap(data);
  } catch {
    throw new Error('error.getAllContractsParse');
  }
};

export default client;
