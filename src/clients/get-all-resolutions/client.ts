import { API_BASE } from '../../conf/http';
import { getHeader } from '../utils';
import { PageResponse, Props } from './types';

const client = async (props: Props): Promise<PageResponse> => {
  const query = new URLSearchParams({
    page: props.page.toString(),
  }).toString();
  const url = `${API_BASE}/resolutions?${query}`;
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
