import { useCallback, useState } from 'react';
import { FetchStatus } from '@/constants';
import client from './client';
import { Contract } from '@/entities/Contract.entity';
import { ReviewedBody } from './types';

const usePatchReviewedContract = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Contract>();
  const [error, setError] = useState<string | null>(null);

  const onResetError = () => {
    setData(undefined);
    setError(null);
  };

  const call = useCallback(
    async (props: ReviewedBody) => {
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
        const result = await client(props);

        setData(result);
        setStatus(FetchStatus.SUCCESS);
      } catch (err) {
        const messageKey =
          (err as Error)?.message ?? 'error.patchReviewedContractFetch';
        setError(messageKey);
        setStatus(FetchStatus.ERROR);
      }
    },
    [status]
  );

  return { status, data, error, call, onResetError };
};

export default usePatchReviewedContract;
