import { API_BASE } from '../../conf/http';
import { cleanDate } from '../../utils';
import { clearAllProps, clearProp, getHeader } from '../utils';
import { PageResponse, PackingListQuery } from './types';

const client = async (props: PackingListQuery): Promise<PageResponse> => {
  const params = {
    page: clearProp(props.page - 1),
    packingListId: clearProp(props.packinglistId),
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
