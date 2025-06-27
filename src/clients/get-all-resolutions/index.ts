import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ResolutionFormModel } from '../../pages/index/types';
import client from './client';
import { ResolutionPaginated } from './types';
import { FetchStatus } from '../../utils';
import { initialResolutiontData } from './utils';

const useGetAllResolutions = () => {
  const { t } = useTranslation();

  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<ResolutionPaginated>(initialResolutiontData);
  const [error, setError] = useState<string | null>(null);

  const onResetError = () => {
    setData(initialResolutiontData);
    setError(null);
  };

  const call = useCallback(
    async (props: ResolutionFormModel) => {
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
          statusId: props?.status?.value || undefined,
          categoryId: props?.categoryId?.value || undefined,
          investmentId: props?.investment?.value || undefined,
          locationId: props?.location?.value || undefined,
          startDate: props?.range?.[0]?.toISOString() || undefined,
          endDate: props?.range?.[1]?.toISOString() || undefined,
          resolutionNumber: props?.resolutionNumber || undefined,
        });
        setData(result);
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

export default useGetAllResolutions;
