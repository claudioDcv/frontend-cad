import { API_BASE } from '../../conf/http';
import { PageResponse, PropsPackingList } from './types';
import { cleanDate } from './utils';
import { getHeader, clearProp, clearAllProps } from '../utils';

const client = async (props: PropsPackingList): Promise<PageResponse> => {
  const params = {
    page: clearProp(props.page),
    packinglistId: clearProp(props.packinglistId),
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
    throw new Error('error.getAllPackingListFetch');
  }

  try {
    return await response.json();
  } catch {
    throw new Error('error.jsonError');
  }
};

export default client;
