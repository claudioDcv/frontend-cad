import { API_BASE } from '../../conf/http';
import { Contract } from '@/entities/Contract.entity';
import { clearProp, getHeader } from '../utils';
import { ReviewedBody } from './types';

const client = async (props: ReviewedBody): Promise<Contract> => {
  console.log('patchReviewedContract', props);
  const url = `${API_BASE}/contracts/${props.contractId}/reviewed`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
    method: 'PATCH',
    body: JSON.stringify({
      note: clearProp(props.note),
      reviewed: props.reviewed,
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
