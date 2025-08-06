import { API_BASE } from '../../conf/http';
import { getHeader } from '../utils';
import { Send } from '@/entities/Send.entity';

const client = async (props: Send): Promise<Send> => {
  const url = `${API_BASE}/resolutions/${props.resolutionId}/send`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify([{
      inventoryTypeId: 1, quantity: 10,
    }]),
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
