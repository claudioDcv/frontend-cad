import { API_BASE } from '../../conf/http';
import { getHeader } from '../utils';
import { Send } from '@/entities/Send.entity';
import { SendRequest } from './index.types';

const client = async (props: SendRequest): Promise<Send> => {
  const url = `${API_BASE}/resolutions/${props.resolutionId}/send`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(props.items),
  });

  if (!response.ok) {
    throw new Error('error.postResolutionSendFetch');
  }

  try {
    return response.json();
  } catch {
    throw new Error('error.postResolutionSendParse');
  }
};

export default client;
