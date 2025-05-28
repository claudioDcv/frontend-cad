import { useCallback, useState } from 'react';
import { FetchStatus } from '../../utils';
import client from './client';
import { remap } from './utils';
import { Option } from '../../types';
import { PropsStatus } from '../types';

const useGetAllStatus = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Option[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastProps, setLastProps] = useState<PropsStatus | null>(null);

  const call = useCallback(async (props: PropsStatus) => {
    const isSameFilter =
      lastProps &&
      lastProps.tableId === props.tableId;

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
      setError((err as Error).message);
      setStatus(FetchStatus.ERROR);
    }
  }, [lastProps, status]);

  return { status, data, error, call };
};

export default useGetAllStatus;
