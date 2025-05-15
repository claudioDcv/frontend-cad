import { API_BASE } from '../../conf/http';
import { sleep } from '../../utils';
import { getHeader } from '../utils';
import { Investment } from './types';

const client = async (): Promise<Investment[]> => {
  const url = `${API_BASE}/investments`;
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  await sleep(2000);

  const data: Investment[] = await response.json();

  return data;
};

export default client;
