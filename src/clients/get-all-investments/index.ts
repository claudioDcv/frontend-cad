import { useCallback, useState } from 'react';
import { FetchStatus, Option } from '@/utils';
import client from './client';
import { remap } from './utils';

const useGetAllInvestments = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Option[]>([]);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(async () => {
    if (status === FetchStatus.ERROR) {
      return;
    }
    if (
      status === FetchStatus.LOADING ||
      status === FetchStatus.SUCCESS ||
      data.length
    ) {
      setStatus(FetchStatus.SUCCESS);
      setError(null);
      return;
    }
    setStatus(FetchStatus.LOADING);
    try {
      const result = await client();
      const model = remap(result);
      setData(model);
      setStatus(FetchStatus.SUCCESS);
    } catch (err) {
      const messageKey = (err as Error)?.message ?? 'error.genericHttpError';
      setError(messageKey);
      setStatus(FetchStatus.ERROR);
    } 
  }, [status, data.length]);

  const clearData = () => {
    setData([]);
    setStatus(FetchStatus.IDLE);
    setError(null);
  };

  return { status, data, error, call, clearData };
};

export default useGetAllInvestments;
