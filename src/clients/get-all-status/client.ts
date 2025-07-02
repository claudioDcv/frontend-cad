import { API_BASE, VITE_MOCK_API } from '../../conf/http';
import { Status } from '@/entities/Status.entity';
import faker, { FakeServices } from '../../fake-clients/get-all-resolutions';
import { clearAllProps, clearProp, getHeader } from '../utils';
import { Props } from './types';

const client = async (props: Props): Promise<Status[]> => {
  const params = {
    tableId: clearProp(props.tableId),
  };

  const query = new URLSearchParams(clearAllProps(params));
  const url = `${API_BASE}/status?${query}`;

  if (VITE_MOCK_API) return faker(FakeServices.Status);
  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('error.getAllStatusFetch');
  }

  try {
    return response.json();
  } catch {
    throw new Error('error.getAllStatusParse');
  }
};

export default client;
