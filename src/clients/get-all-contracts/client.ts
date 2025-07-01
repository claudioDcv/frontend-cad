import { API_BASE } from '../../conf/http';
import { clearAllProps, clearProp, getHeader } from '../utils';
import { PageResponse, ContractQuery } from './types';

const client = async (props: ContractQuery): Promise<PageResponse> => {
  const params = {
    page: clearProp(props.page - 1),
    resolutionId: clearProp(props.resolutionId),
    contractNumber: clearProp(props.contractNumber),
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
    return response.json();
  } catch {
    throw new Error('error.getAllContractsParse');
  }
};

export default client;
