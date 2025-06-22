import { useCallback, useState } from 'react';
import { FetchStatus } from '../../utils';
import { remap } from './utils';
import client from './client';
import { PackingListPaginated } from './types';
import { useTranslation } from 'react-i18next';
import { PackingListFormModel } from '../../pages/index/types';

const useGetAllPackingList = () => {
  const { t } = useTranslation();

  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<PackingListPaginated>({
    packingList: [],
    meta: { page: 0, count: 0 },
  });
  const [error, setError] = useState<string | null>(null);

  const onResetError = () => {
    setData({ packingList: [], meta: { page: 0, count: 0 } });
    setError(null);
  };

  const call = useCallback(
    async (props: PackingListFormModel) => {
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
        setError(t(messageKey));
        setStatus(FetchStatus.ERROR);
      }
    },
    [status, t]
  );

  return { status, data, error, call, onResetError };
};

export default useGetAllPackingList;
