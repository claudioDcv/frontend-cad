import { useCallback, useState } from 'react';
import { FetchStatus } from '@/constants';
import client from './client';
import { initialPackingListData, remap } from './utils';
import { PackingListPaginated } from './types';
import { cleanDate, toOptional } from '../../utils';
import { PackingListFormModel } from '../../pages/index/types';

const useGetAllPackingList = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<PackingListPaginated>(
    initialPackingListData
  );
  const [error, setError] = useState<string>('');

  const onResetError = () => {
    setData(initialPackingListData);
    setError('');
  };

  const call = useCallback(
    async (props: PackingListFormModel) => {
      if (status === FetchStatus.ERROR) {
        return;
      }

      if (status === FetchStatus.LOADING) {
        setStatus(FetchStatus.SUCCESS);
        setError('');
        return;
      }

      setStatus(FetchStatus.LOADING);

      try {
        const result = await client({
          page: props.page,
          packinglistId: toOptional(props.docNumber),
          categoryId: toOptional(props.categoryId.value),
          statusId: toOptional(props.status.value),
          investmentId: toOptional(props.investment.value),
          originLocationId: toOptional(props.location?.value),
          startDate: cleanDate(props.range?.[0]),
          endDate: cleanDate(props.range?.[1]),
        });

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

  return { status, data, error, call, onResetError };
};

export default useGetAllPackingList;
