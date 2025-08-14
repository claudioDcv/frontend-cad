import { useCallback, useState } from 'react';
import { FetchStatus } from '@/constants';
import client from './client';
import { Receivable } from '@/entities/Receivable.entity';

const useGetReceivables = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Receivable[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onResetError = () => {
    setData([]);
    setError(null);
  };

  const call = useCallback(
    async (resolutionId: number) => {
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
        const result = await client(resolutionId);

        setData(result);
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

  return { status, data, error, call, onResetError };
};

export default useGetReceivables;
