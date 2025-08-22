import { Receivable } from '@/entities/Receivable.entity';
import { clearAllProps, clearProp, pageableToPaginated } from '../utils';
import { Paginated } from '../types';
import { getFetch } from '../customFetch';

export interface ReceivableProps {
  page: number;
  resolutionId?: number;
  size?: number;
}

const client = async (props: ReceivableProps) => {
  const query = new URLSearchParams(clearAllProps({
    resolutionId: clearProp(props.resolutionId),
    size: clearProp(props.size || 10),
    page: clearProp(props.page - 1),
  }));
  const url = `receivables?${query}`;
  return getFetch<Paginated<Receivable>>(url, { remap: pageableToPaginated }, {
    responseError: 'error.getAllReceivablesFetch',
    defaultError: 'error.getAllReceivablesParse',
  });
}

export default client;
