import { useCallback, useState } from 'react';
import { FetchStatus } from '../../utils';
import client from './client';
import { remap } from './utils';
import { PackingListPaginated, PropsPackingList } from './types';

const useGetAllPackingList = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<PackingListPaginated>({
    packingList: [],
    meta: { page: 0, count: 0 },
  });
  const [error, setError] = useState<string | null>(null);
  const [lastProps, setLastProps] = useState<PropsPackingList | null>(null);

  const call = useCallback(
    async (props: PropsPackingList) => {
        const isSameFilter =
        lastProps &&
        lastProps.page === props.page &&
        lastProps.size === props.size &&
        lastProps.sort === props.sort &&
        lastProps.startDate === props.startDate &&
        lastProps.endDate === props.endDate &&
        lastProps.originCcId === props.originCcId &&
        lastProps.destinyCcId === props.destinyCcId &&
        lastProps.categoryId === props.categoryId &&
        lastProps.statusId === props.statusId;
    
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

export default useGetAllPackingList;
