import { API_BASE } from '../../conf/http';
import { clearProp, getHeader } from '../utils';
import { Contract } from '@/entities/Contract.entity';

const client = async (props: Contract): Promise<Contract> => {
  const url = `${API_BASE}/contracts/${props.contractId}/reviewed`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
    method: 'PATCH',
    body: JSON.stringify({
      note: clearProp(props.cadMetadata?.note),
      reviewed: props.cadMetadata?.reviewed ?? false,
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
