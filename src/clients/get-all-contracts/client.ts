import { API_BASE } from '../../conf/http';
import { clearAllProps, clearProp, getHeader } from '../utils';
import { PageResponse, PropsContract } from './types';

const client = async (props: PropsContract): Promise<PageResponse> => {
  const params = {
    page: clearProp(props.page - 1),
    resolutionId: clearProp(props.resolutionId),
    contractId: clearProp(props.contractId),
  }

  const query = new URLSearchParams(clearAllProps(params));
  const url = `${API_BASE}/contracts?${query}`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('error.getAllContractsFetch');
  }

  try {
    return await response.json();
  } catch {
    throw new Error('error.jsonError');
  }
};

export default client;
