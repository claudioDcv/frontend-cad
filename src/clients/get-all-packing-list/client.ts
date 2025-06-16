import { API_BASE } from '../../conf/http';
import { getHeader, clearProp, clearAllProps } from '../utils';
import { PageResponse, PropsPackingList } from './types';
import { cleanDate } from './utils';

const client = async (props: PropsPackingList): Promise<PageResponse> => {
  const params = {
    page: clearProp(props.page),
    size: clearProp(props.size),
    sort: clearProp(props.sort),
    startDate: cleanDate(props.startDate),
    endDate: cleanDate(props.endDate),
    originCcId: clearProp(props.originCcId),
    destinyCcId: clearProp(props.destinyCcId),
    categoryId: clearProp(props.categoryId),
    statusId: clearProp(props.statusId),
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
