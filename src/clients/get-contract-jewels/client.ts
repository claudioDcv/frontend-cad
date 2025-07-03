import { API_BASE } from '../../conf/http';
import { ResolutionDetail } from '@/entities/ResolutiontDetail.entity';
import { clearAllProps, clearProp, getHeader } from '../utils';

const client = async (contractId: string): Promise<ResolutionDetail[]> => {
  const params = {
    contractId: clearProp(contractId),
  };

  const query = new URLSearchParams(clearAllProps(params));
  const url = new URL(`${API_BASE}/contract-detail?${query}`);

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
