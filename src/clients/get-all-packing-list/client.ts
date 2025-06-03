import { API_BASE } from '../../conf/http';
import { getHeader } from '../utils';
import { PageResponse, PropsPackingList } from './types';

const client = async (props: PropsPackingList): Promise<PageResponse> => {
  const params: Record<string, string> = {
    page: props.page.toString(),
  };

  if (props.size !== undefined) params.size = props.size.toString();
  if (props.sort) params.sort = props.sort;
  if (props.startDate) params.startDate = props.startDate;
  if (props.endDate) params.endDate = props.endDate;
  if (props.originCcId !== undefined)
    params.originCcId = props.originCcId.toString();
  if (props.destinyCcId !== undefined)
    params.destinyCcId = props.destinyCcId.toString();
  if (props.categoryId !== undefined)
    params.categoryId = props.categoryId.toString();
  if (props.statusId !== undefined) params.statusId = props.statusId.toString();

  const query = new URLSearchParams(params).toString();
  const url = `${API_BASE}/packinglist?${query}`;

  console.log('URL:', url);

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
