import { useCallback, useState } from 'react';
import { FetchStatus } from '../../utils';
import client from './client';
import { remap } from './utils';
import { Option } from '../../types';

const useGetAllMaterialTypes = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Option[]>([]);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(async () => {
    setStatus(FetchStatus.LOADING);
    try {
      if (status === FetchStatus.LOADING || status === FetchStatus.SUCCESS || data.length) {
        setStatus(FetchStatus.SUCCESS);
        setError(null);
        return;
      }
      const result = await client();
      const model = remap(result);
      setData(model);
      setStatus(FetchStatus.SUCCESS);
    } catch (err) {
      setError((err as Error).message);
      setStatus(FetchStatus.ERROR);
    }
  }, [status, data]);

  return { status, data, error, call };
};

export default useGetAllMaterialTypes;