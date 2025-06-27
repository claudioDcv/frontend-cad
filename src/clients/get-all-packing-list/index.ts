import { useCallback, useState } from 'react';

import client from './client';
import { initialPackingListData, remap } from './utils';
import { PackingListPaginated } from './types';

import { FetchStatus } from '../../utils';
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
          packinglistId: props.docNumber || undefined,
          categoryId: props.categoryId?.value || undefined,
          statusId: props.status?.value || undefined,
          investmentId: props.investment?.value || undefined,
          originLocationId: props.location?.value || undefined,
          startDate: props.range?.[0]?.toISOString().split('T')[0] || undefined,
          endDate: props.range?.[1]?.toISOString().split('T')[0] || undefined,
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
