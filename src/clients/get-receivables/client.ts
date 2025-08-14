import { Receivable } from '@/entities/Receivable.entity';
import { API_BASE } from '../../conf/http';
import { getHeader } from '../utils';
import { PageResponse } from '../types';

const client = async (resolutionId: number): Promise<Receivable[]> => {
  const url = `${API_BASE}/receivables?resolutionId=${resolutionId}`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('error.getAllReceivablesFetch');
  }

  try {
    const data = await response.json() as PageResponse<Receivable>;
    return data.content || [];
  } catch {
    throw new Error('error.getAllReceivablesParse');
  }
};

export default client;
