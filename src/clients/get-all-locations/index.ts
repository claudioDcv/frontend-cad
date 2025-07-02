import { useCallback, useState } from 'react';
import { Props } from './types';
import client from './client';
import { FetchStatus } from '../../utils';
import { remap } from './utils';
import { Option } from '@/utils';

const useGetAllLocations = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Option[]>([]);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(
    async (props: Props) => {
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
        const result = await client(props);
        const model = remap(result);
        setData(model);
        setStatus(FetchStatus.SUCCESS);
      } catch (err) {
        const messageKey = (err as Error)?.message ?? 'error.genericHttpError';
        setError(messageKey);
        setStatus(FetchStatus.ERROR);
      }
    },
    [status]
  );

  const clearData = () => {
    setData([]);
    setStatus(FetchStatus.IDLE);
    setError(null);
  };

  return { status, data, error, call, clearData };
};

export default useGetAllLocations;
