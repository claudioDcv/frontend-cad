import { API_BASE } from '../../conf/http';
import { PropsResolution } from './types';
import { clearAllProps, clearProp, getHeader } from '../utils';
import { PageResponse } from './types';

const client = async (props: PropsResolution): Promise<PageResponse> => {
  const params = {
    page: clearProp(props.page),
    investmentId: clearProp(props.investmentId),
    locationId: clearProp(props.locationId),
    categoryId: clearProp(props.categoryId),
    stateId: clearProp(props.stateId),
    startDate: clearProp(props.startDate),
    endDate: clearProp(props.endDate),
  };

  const query = new URLSearchParams(clearAllProps(params));
  const url = `${API_BASE}/resolutions?${query}`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  console.log('URL:', url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  try {
    return await response.json();
  } catch {
    throw new Error('Failed to parse JSON response');
  }
};

export default client;
