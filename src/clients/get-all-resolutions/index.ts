import { useCallback, useState } from 'react';
import { FetchStatus } from '../../utils';
import client from './client';
import { remap } from './utils';
import { ResolutionPaginated } from './types';
import { PropsResolution } from './types';

const useGetAllResolutions = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<ResolutionPaginated>({
    resolutions: [],
    meta: { page: 0, count: 0 },
  });
  const [error, setError] = useState<string | null>(null);
  const [lastProps, setLastProps] = useState<PropsResolution | null>(null);

  const onResetError = () => {
    setData({ resolutions: [], meta: { page: 0, count: 0 } });
    setError(null);
  };

  const call = useCallback(
    async (props: PropsResolution) => {
      const isSameFilter =
        lastProps &&
        lastProps.page === props.page &&
        lastProps.investmentId === props.investmentId &&
        lastProps.locationId === props.locationId &&
        lastProps.categoryId === props.categoryId &&
        lastProps.stateId === props.stateId &&
        lastProps.startDate === props.startDate &&
        lastProps.endDate === props.endDate;

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
        setError(
          (err as Error).message ||
            'An error occurred while fetching resolutions'
        );
        setStatus(FetchStatus.ERROR);
      }
    },
    [lastProps, status]
  );

  return { status, data, error, call, onResetError };
};

export default useGetAllResolutions;
