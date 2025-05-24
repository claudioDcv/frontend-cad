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
  const [lastProps, setLastProps] = useState<Props | null>(null);

  const call = useCallback(
    async (props: Props) => {
      const isSameFilter =
        lastProps &&
        lastProps.page === props.page &&
        lastProps.investmentId === props.investmentId &&
        lastProps.locationId === props.locationId &&
        lastProps.categoryId === props.categoryId 

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
    },
    [lastProps, status]
  );

  return { status, data, error, call };
};

export default useGetAllResolutions;
