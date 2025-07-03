import { API_BASE, VITE_MOCK_API } from '../../conf/http';
import { Contract } from '@/entities/Contract.entity';
import { clearProp, getHeader } from '../utils';
import { ReviewedBody } from './types';
import faker, { FakeServices } from '@/fake-clients/get-all-resolutions';

const client = async (props: ReviewedBody): Promise<Contract> => {
  const url = `${API_BASE}/contracts/${props.contractId}/reviewed`;

  if (VITE_MOCK_API) return faker(FakeServices.patchReviewedContract);

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
    method: 'PATCH',
    body: JSON.stringify({
      note: clearProp(props.note),
      reviewed: clearProp(props.reviewed),
    }),
  });

  if (!response.ok) {
    throw new Error('error.patchReviewedContractFetch');
  }

  try {
    return response.json();
  } catch {
    throw new Error('error.patchReviewedContractParse');
  }
};

export default client;
