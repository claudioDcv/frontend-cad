import { API_BASE } from '../../conf/http';
import { getHeader } from '../utils';
import { MaterialType } from './types';

const client = async (): Promise<MaterialType[]> => {
  const url = `${API_BASE}/material-categories`;
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
