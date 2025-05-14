import { useCallback, useState } from 'react';
import { FetchStatus } from '../../utils';
import { Branch } from './types';
import client from './client';

const useGetAllBranches = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Branch[]>([]);
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

export default useGetAllBranches;
