import { API_BASE, VITE_MOCK_API } from '../../conf/http';
import { PropsResolution } from './types';
import { clearAllProps, clearProp, getHeader } from '../utils';
import { PageResponse } from './types';
import faker, { FakeServices } from '../../fake-clients/get-all-resolutions';

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

  if (VITE_MOCK_API) return faker(FakeServices.Resolutions);
  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export default client;
