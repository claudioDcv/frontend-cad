import { API_BASE } from '../../conf/http';
import { PropsResolution } from '../types';
import { getHeader } from '../utils';
import { PageResponse } from './types';

const client = async (props: PropsResolution): Promise<PageResponse> => {
  const params: Record<string, string> = {
    page: props.page.toString(),
  };
  if (props.investmentId !== undefined && props.investmentId !== null) {
    params.investmentId = props.investmentId.toString();
  }
  if (props.locationId !== undefined && props.locationId !== null) {
    params.locationId = props.locationId.toString();
  }
  if (props.categoryId !== undefined && props.categoryId !== null) {
    params.categoryId = props.categoryId.toString();
  }
  if (props.stateId !== undefined && props.stateId !== null) {
    params.stateId = props.stateId.toString();
  }
  if (props.startDate) {
    params.startDate = props.startDate;
  }
  if (props.endDate) {
    params.endDate = props.endDate;
  }

  const query = new URLSearchParams(params).toString();
  const url = `${API_BASE}/resolutions?${query}`;

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
