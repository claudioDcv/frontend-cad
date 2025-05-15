import { API_BASE } from '../../conf/http';
import { getHeader } from '../utils';
import { MaterialType } from './types';

const client = async (): Promise<MaterialType[]> => {
  const url = `${API_BASE}/material-categories`;
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
