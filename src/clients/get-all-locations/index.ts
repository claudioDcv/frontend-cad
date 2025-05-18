import { useCallback, useState } from 'react';
import { FetchStatus } from '../../utils';
import { Props } from './types';
import client from './client';
import { Option } from '../../types';
import { remap } from './utils';

const useGetAllLocations = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Option[]>([]);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(async (props: Props) => {
    setStatus(FetchStatus.LOADING);
    try {
      const result = await client(props);
      const model = remap(result);
      setData(model);
      setStatus(FetchStatus.SUCCESS);
    } catch (err) {
      setError((err as Error).message);
      setStatus(FetchStatus.ERROR);
    }
  }, []);

  const clearData = () => {
    setData([]);
    setStatus(FetchStatus.IDLE);
    setError(null);
  };

  return { status, data, error, call, clearData };
};

export default useGetAllLocations;
