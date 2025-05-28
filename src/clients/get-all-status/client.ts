import { API_BASE } from '../../conf/http';
import { PropsStatus } from '../types';
import { getHeader } from '../utils';
import { Status } from './types';

const client = async (props: PropsStatus): Promise<Status[]> => {
  const params: Record<string, string> = {};

  if (props.tableId !== undefined && props.tableId !== null) {
    params.tableId = props.tableId.toString();
  }

  const query = new URLSearchParams(params).toString();
  const url = `${API_BASE}/status?${query}`;

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
