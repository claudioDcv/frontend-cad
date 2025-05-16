import { useCallback, useState } from 'react';
import { FetchStatus } from '../../utils';
import client from './client';
import { remap } from './utils';
import { Props, ResolutionPaginated } from './types';

const useGetAllResolutions = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<ResolutionPaginated>({
    resolutions: [],
    meta: { page: 0, count: 0 },
  });
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(
    async (props: Props) => {
      setStatus(FetchStatus.LOADING);
      try {
        if (status === FetchStatus.LOADING || props.page === data.meta.page) {
          setStatus(FetchStatus.SUCCESS);
          setError(null);
          return;
        }
        const result = await client(props);
        const model = remap(result);
        setData(model);
        setStatus(FetchStatus.SUCCESS);
      } catch (err) {
        setError((err as Error).message);
        setStatus(FetchStatus.ERROR);
      }
    },
    [data.meta.page, status]
  );

  return { status, data, error, call };
};

export default useGetAllResolutions;
