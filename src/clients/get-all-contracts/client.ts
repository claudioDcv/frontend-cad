import { API_BASE } from '../../conf/http';
import { Contract } from '@/entities/Contract.entity';
import { clearAllProps, clearProp, getHeader } from '../utils';
import { ContractQuery } from './types';

const client = async (props: ContractQuery): Promise<Contract[]> => {
  const params = {
    resolutionId: clearProp(props.resolutionId),
  }

  const query = new URLSearchParams(clearAllProps(params));
  const url = `${API_BASE}/contracts/all?${query}`;

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
