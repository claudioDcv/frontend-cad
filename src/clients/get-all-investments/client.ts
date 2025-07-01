import { API_BASE, VITE_MOCK_API } from '../../conf/http';
import faker, { FakeServices } from '../../fake-clients/get-all-resolutions';
import { getHeader } from '../utils';
import { Investment } from './types';

const client = async (): Promise<Investment[]> => {
  const url = `${API_BASE}/investments`;
  if (VITE_MOCK_API) return faker(FakeServices.Investments);
  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('error.getAllInvestmentsFetch'); 
  }

  try {
    return response.json();
  } catch {
    throw new Error('error.getAllInvestmentsParse');
  }
};

export default client;
