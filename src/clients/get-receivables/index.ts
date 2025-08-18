import { useCallback, useState } from 'react';
import { FetchStatus } from '@/constants';
import client, { ReceivableProps } from './client';
import { Receivable } from '@/entities/Receivable.entity';
import { initialPaginatedData, pageableToPaginated } from '../utils';
import { Paginated } from '../types';

const useGetReceivables = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Paginated<Receivable>>(initialPaginatedData);
  const [error, setError] = useState<string | null>(null);

  const onResetError = () => {
    setData(initialPaginatedData);
    setError(null);
  };

  const call = useCallback(
    async (props: ReceivableProps) => {
      if (status === FetchStatus.ERROR) {
        return;
      }

      if (status === FetchStatus.LOADING) {
        setStatus(FetchStatus.SUCCESS);
        setError('');
        return;
      }

      setStatus(FetchStatus.LOADING);

      try {
        const result = await client(props);

        setData(pageableToPaginated(result));
        setStatus(FetchStatus.SUCCESS);
      } catch (err) {
        const messageKey =
          (err as Error)?.message ?? 'error.getAllReceivablesFetch';
        setError(messageKey);
        setStatus(FetchStatus.ERROR);
      }
    },
    [status]
  );

  const reset = useCallback(() => {
    setStatus(FetchStatus.IDLE);
    setData(initialPaginatedData);
    setError(null);
  }, []);

  return { status, data, error, call, onResetError, reset };
};

export default useGetReceivables;
