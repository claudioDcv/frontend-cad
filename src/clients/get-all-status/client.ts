import { API_BASE } from '../../conf/http';
import { PropsStatus } from '../types';
import { clearAllProps, clearProp, getHeader } from '../utils';
import { Status } from './types';

const client = async (props: PropsStatus): Promise<Status[]> => {
  const params: Record<string, string> = {};

  params.tableId = clearProp(props.tableId);

  const query = new URLSearchParams(clearAllProps(params));
  const url = `${API_BASE}/status?${query}`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export default client;
