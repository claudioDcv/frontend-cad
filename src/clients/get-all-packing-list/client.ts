import { API_BASE } from '../../conf/http';
import { getHeader, clearProp, clearAllProps } from '../utils';
import { PageResponse, PropsPackingList } from './types';

const client = async (props: PropsPackingList): Promise<PageResponse> => {
  const params: Record<string, string> = {
    page: clearProp(props.page),
    size: clearProp(props.size),
    sort: clearProp(props.sort),
    startDate: clearProp(props.startDate),
    endDate: clearProp(props.endDate),
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
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export default client;
