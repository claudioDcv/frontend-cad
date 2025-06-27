import { API_BASE, VITE_MOCK_API } from '../../conf/http';
import faker, { FakeServices } from '../../fake-clients/get-all-resolutions';
import { getHeader } from '../utils';
import { MaterialType } from './types';

const client = async (): Promise<MaterialType[]> => {
  const url = `${API_BASE}/material-categories`;
  if (VITE_MOCK_API) return faker(FakeServices.MaterialTypes);
  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('error.getAllMaterialTypesFetch'); 
  }

  try {
    return await response.json();
  } catch {
    throw new Error('error.jsonError');
  }
};

export default client;
