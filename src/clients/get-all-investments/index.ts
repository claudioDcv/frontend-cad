import { useCallback, useState } from 'react';
import { FetchStatus } from '../../utils';
import { Investment } from './types';
import client from './client';

const useGetAllInvestments = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Investment[]>([]);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(async () => {
    setStatus(FetchStatus.LOADING);
    try {
      const result = await client();
      setData(result);
      setStatus(FetchStatus.SUCCESS);
    } catch (err) {
      setError((err as Error).message);
      setStatus(FetchStatus.ERROR);
    }
  }, []);

  return { status, data, error, call };
};

export default useGetAllInvestments;
