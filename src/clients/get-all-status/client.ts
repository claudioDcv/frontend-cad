import { API_BASE } from '../../conf/http';
import { clearAllProps, clearProp, getHeader } from '../utils';
import { Props, Status } from './types';

const client = async (props: Props): Promise<Status[]> => {
  const params = {
    tableId: clearProp(props.tableId)
  };

  const query = new URLSearchParams(clearAllProps(params));
  const url = `${API_BASE}/status?${query}`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('error.getAllStatusFetch');
  }

  try {
    return await response.json();
  } catch {
    throw new Error('error.jsonError');
  }
};

export default client;
