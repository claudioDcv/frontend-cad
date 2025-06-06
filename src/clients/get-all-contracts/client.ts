import { API_BASE } from '../../conf/http';
import { clearAllProps, clearProp, getHeader } from '../utils';
import { PageResponse, PropsContract } from './types';

const client = async (props: PropsContract): Promise<PageResponse> => {
  const params: Record<string, string> = {
    page: clearProp(props.page),
  };

  params.resolutionId = clearProp(props.resolutionId);

  const query = new URLSearchParams(clearAllProps(params));
  const url = `${API_BASE}/contracts?${query}`;

  console.log('URL:', url);

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
