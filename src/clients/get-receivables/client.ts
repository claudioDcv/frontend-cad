import { Receivable } from '@/entities/Receivable.entity';
import { API_BASE } from '../../conf/http';
import { clearAllProps, clearProp, getHeader } from '../utils';
import { PageResponse } from '../types';

export interface ReceivableProps {
  page: number;
  resolutionId?: number;
  size?: number;
}

const client = async (props: ReceivableProps): Promise<PageResponse<Receivable>> => {
  const query = new URLSearchParams(clearAllProps({
    resolutionId: clearProp(props.resolutionId),
    size: clearProp(props.size || 10),
    page: clearProp(props.page - 1),
  }));
  const url = new URL(`${API_BASE}/receivables?${query}`);

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('error.getAllReceivablesFetch');
  }

  try {
    const data = await response.json() as PageResponse<Receivable>;
    return data;
  } catch {
    throw new Error('error.getAllReceivablesParse');
  }
};

export default client;
