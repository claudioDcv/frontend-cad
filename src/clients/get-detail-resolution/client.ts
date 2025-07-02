import { API_BASE } from '../../conf/http';
import { ResolutionDetail } from '@/entities/ResolutiontDetail.entity';
import { clearAllProps, clearProp, getHeader } from '../utils';
import { Props } from './type';

const client = async (props: Props): Promise<ResolutionDetail[]> => {
  const params = {
    contractId: clearProp(props.contractId),
  };

  const query = new URLSearchParams(clearAllProps(params));
  const url = new URL(`${API_BASE}/contract-detail?${query}`);

  const response = await fetch(url.toString(), {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('error.getResolutionFetch');
  }

  try {
    return await response.json();
  } catch {
    throw new Error('error.jsonError');
  }
};

export default client;
