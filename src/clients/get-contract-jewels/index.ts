import { useCallback, useState } from 'react';
import { FetchStatus } from '@/constants';
import { ResolutionDetail } from '@/entities/ResolutiontDetail.entity';
import client from './client';

const useGetContractJewels = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<ResolutionDetail[]>([]);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(
    async (contractId: string) => {
      if (status === FetchStatus.ERROR) {
        return;
      }

      if (status === FetchStatus.LOADING) {
        setStatus(FetchStatus.SUCCESS);
        setError(null);
        return;
      }

      setStatus(FetchStatus.LOADING);

      try {
        const result = await client(contractId);
        setData(result);
        setStatus(FetchStatus.SUCCESS);
      } catch (err) {
        const messageKey = (err as Error)?.message ?? 'error.genericHttpError';
        setError(messageKey);
        setStatus(FetchStatus.ERROR);
      }
    },
    [status]
  );

  return { status, data, error, call };
};

export default useGetContractJewels;
