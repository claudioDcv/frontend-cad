import { API_BASE } from '../../conf/http';
import { getHeader, clearProp, clearAllProps } from '../utils';
import { Location, Props } from './types';

const client = async (props: Props): Promise<Location[]> => {
  const params = {
    investmentId: clearProp(props.investmentId),
    status: clearProp(props.status),
  };

  const query = new URLSearchParams(clearAllProps(params));
  const url = `${API_BASE}/locations?${query}`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('error.getAllLocationsFetch'); 
  }

  try {
    return response.json();
  } catch {
    throw new Error('error.getAllLocationsFetchParse');
  }
};

export default client;
