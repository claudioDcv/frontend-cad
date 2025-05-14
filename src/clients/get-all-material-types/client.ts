import { sleep } from '../../utils';
import { API_BASE } from '../../conf/http';
import { MaterialType } from './types';

const client = async (jwt: string): Promise<MaterialType[]> => {
  const url = `${API_BASE}/api/v1/material-categories`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `${jwt}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  await sleep(2000);

  const data: MaterialType[] = await response.json();

  return data;
};

export default client;