import { API_BASE } from '../../conf/http';
import { getHeader } from '../utils';
import { PageResponse, PropsContract } from './types';

const client = async (props: PropsContract): Promise<PageResponse> => {
  const params: Record<string, string> = {
    page: props.page.toString(),
  };

  if (props.resolutionId) {
    params.resolutionId = props.resolutionId.toString();
  }

  const query = new URLSearchParams(params).toString();
  const url = `${API_BASE}/contracts?${query}`;

  console.log('URL:', url);

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export default client;
