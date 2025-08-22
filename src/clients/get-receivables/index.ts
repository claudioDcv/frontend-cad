import client, { ReceivableProps } from './client';
import { Receivable } from '@/entities/Receivable.entity';
import { initialPaginatedData } from '../utils';
import { Paginated } from '../types';
import useAsyncCall from '@/hooks/useAsyncCall';

const useGetReceivables = () => useAsyncCall<ReceivableProps, Paginated<Receivable>>({
  client,
  initial: initialPaginatedData,
});

export default useGetReceivables;
