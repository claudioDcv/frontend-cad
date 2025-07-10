import { useCallback, useState } from 'react';
import { FetchStatus } from '@/constants';
import client from './client';
import { Resolution } from '@/entities/Resolution.entity';

const usePatchResolutionResolve = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Resolution>();
  const [error, setError] = useState<string | null>(null);

  const onResetError = () => {
    setData(undefined);
    setError(null);
  };

  const call = useCallback(
    async (props: Resolution) => {
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
        return result;
      } catch (err) {
        const messageKey =
          (err as Error)?.message ?? 'error.patchResolveResolutionFetch';
        setError(messageKey);
        setStatus(FetchStatus.ERROR);
      }
    },
    [status]
  );

  return { status, data, error, call, onResetError };
};

export default usePatchResolutionResolve;
