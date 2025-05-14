import { useCallback, useState } from 'react';
import { FetchStatus } from '../../utils';
import { Resolution } from './types';
import client from './client';

const useGetAllResolutions = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Resolution[]>([]);
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

export default useGetAllResolutions;
