import { API_BASE } from '../../conf/http';
import { clearAllProps, clearProp, getHeader } from '../utils';
import { ResolutionQuery } from './types';
import { remap } from './utils';

const client = async (props: ResolutionQuery) => {
  const params = {
    page: clearProp(props.page - 1),
    resolutionNumber: clearProp(props.resolutionNumber),
    resolutionId: clearProp(props.resolutionId),
    investmentId: clearProp(props.investmentId),
    locationId: clearProp(props.locationId),
    categoryId: clearProp(props.categoryId),
    statusId: clearProp(props.statusId),
    startDate: clearProp(props.startDate),
    endDate: clearProp(props.endDate),
  };

  const query = new URLSearchParams(clearAllProps(params));
  const url = `${API_BASE}/resolutions?${query}`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('error.getAllResolutionsFetch');
  }

  try {
    const res = await response.json();
    return remap(res);
  } catch {
    throw new Error('error.jsonError');
  }
};

export default client;
