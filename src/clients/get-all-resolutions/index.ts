import { useState, useCallback } from 'react';
import { FetchStatus } from '@/constants';
import client from './client';
import { ResolutionPaginated } from './types';
import { toOptional } from '../../utils';
import { initialResolutiontData } from './utils';
import { ResolutionFormModel } from '../../pages/index/types';

const useGetAllResolutions = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<ResolutionPaginated>(initialResolutiontData);
  const [error, setError] = useState('');

  const onResetError = () => {
    setData(initialResolutiontData);
    setError('');
  };

  const call = useCallback(
    async (props: ResolutionFormModel) => {
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
          statusId: toOptional(props.status.value),
          categoryId: toOptional(props.categoryId.value),
          investmentId: toOptional(props.investment.value),
          locationId: toOptional(props.location.value),
          startDate: props?.range?.[0]?.toISOString(),
          endDate: props?.range?.[1]?.toISOString(),
          resolutionNumber: toOptional(props.resolutionNumber),
        });
        
        setData(result);
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

export default useGetAllResolutions;
