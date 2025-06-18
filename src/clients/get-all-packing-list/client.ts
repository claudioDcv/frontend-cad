import { API_BASE } from '../../conf/http';
import { getHeader, clearProp, clearAllProps } from '../utils';
import { PageResponse, PropsPackingList } from './types';
import { cleanDate } from './utils';

const client = async (props: PropsPackingList): Promise<PageResponse> => {
  const params = {
    page: clearProp(props.page),
    startDate: cleanDate(props.startDate),
    endDate: cleanDate(props.endDate),
    categoryId: clearProp(props.categoryId),
    statusId: clearProp(props.statusId),
    investmentId: clearProp(props.investmentId),
    originLocationId: clearProp(props.originLocationId),   
    destinyLocationId: clearProp(props.destinyLocationId),
  };
  
  const query = new URLSearchParams(clearAllProps(params));
  const url = `${API_BASE}/packinglist?${query}`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

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
