import { useCallback, useState } from 'react';
import { FetchStatus } from '../../utils';
import { MaterialType } from './types';
import client from './client';

const useGetAllMaterialTypes = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<MaterialType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(async () => {
    const jwt = localStorage.getItem('jwt') || '';

    setStatus(FetchStatus.LOADING);
    try {
      const result = await client(jwt);
      setData(result);
      setStatus(FetchStatus.SUCCESS);
    } catch (err) {
      setError((err as Error).message);
      setStatus(FetchStatus.ERROR);
    }
  }, []);

  return { status, data, error, call };
};

export default useGetAllMaterialTypes;