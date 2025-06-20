import { useCallback, useState } from 'react';
import { FetchStatus } from '../../utils';
import client from './client';
import { remap } from './utils';
import { PackingListPaginated, PropsPackingList } from './types';
import { useTranslation } from 'react-i18next';

const useGetAllPackingList = () => {
  const { t } = useTranslation();

  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<PackingListPaginated>({
    packingList: [],
    meta: { page: 0, count: 0 },
  });
  const [error, setError] = useState<string | null>(null);
  const [lastProps, setLastProps] = useState<PropsPackingList | null>(null);

  const onResetError = () => {
    setData({ packingList: [], meta: { page: 0, count: 0 } });
    setError(null);
  };

  const call = useCallback(
    async (props: PropsPackingList) => {
      const isSameFilter =
      lastProps &&
      lastProps.page === props.page &&
      lastProps.packinglistId === props.packinglistId &&
      lastProps.investmentId === props.investmentId &&
      lastProps.originLocationId === props.originLocationId &&
      lastProps.destinyLocationId === props.destinyLocationId &&
      lastProps.categoryId === props.categoryId &&
      lastProps.statusId === props.statusId &&
      lastProps.startDate === props.startDate &&
      lastProps.endDate === props.endDate;

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
        setError(t(messageKey));
        setStatus(FetchStatus.ERROR);
      } 
    },
    [lastProps, status, t]
  );

  return { status, data, error, call, onResetError };
};

export default useGetAllPackingList;
