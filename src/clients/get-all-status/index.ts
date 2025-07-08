import { useCallback, useState } from 'react';
import client from './client';
import { FetchStatus } from '@/constants';
import { Option } from '@/entities/Option.entity';
import { Props } from './types';
import { remap } from './utils';

const useGetAllStatus = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Option[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastProps, setLastProps] = useState<Props | null>(null);

  const call = useCallback(
    async (props: Props) => {
      const isSameFilter = lastProps && lastProps.tableId === props.tableId;

      if (status === FetchStatus.ERROR) {
        return;
      }

      if (status === FetchStatus.LOADING || isSameFilter) {
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
        setLastProps(props);
      } catch (err) {
        const messageKey = (err as Error)?.message ?? 'error.genericHttpError';
        setError(messageKey);
        setStatus(FetchStatus.ERROR);
      }
    },
    [lastProps, status]
  );

  return { status, data, error, call };
};

export default useGetAllStatus;
