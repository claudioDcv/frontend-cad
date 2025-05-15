import { API_BASE } from '../../conf/http';
import { getHeader } from '../utils';
import { Location, Props } from './types';

const client = async (props: Props): Promise<Location[]> => {
  const query = new URLSearchParams({
    investmentId: props.investmentId,
    status: typeof props.status === 'boolean' ? String(props.status) : '',
  }).toString();
  const url = `${API_BASE}/locations?${query}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();

};

export default client;
