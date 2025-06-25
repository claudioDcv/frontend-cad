import { API_BASE, VITE_MOCK_API } from '../../conf/http';
import faker, { FakeServices } from '../../fake-clients/get-all-resolutions';
import { PropsStatus } from '../types';
import { clearAllProps, clearProp, getHeader } from '../utils';
import { Status } from './types';

const client = async (props: PropsStatus): Promise<Status[]> => {
  const params = {
    tableId: clearProp(props.tableId)
  };

  const query = new URLSearchParams(clearAllProps(params));
  const url = `${API_BASE}/status?${query}`;

  if (VITE_MOCK_API) return faker(FakeServices.Status);
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
