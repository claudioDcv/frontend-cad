import { useCallback, useState } from 'react';
import { FetchStatus } from '@/constants';
import { InventoryResolution } from '@/entities/InventoryResolution.entity';
import client from './client';

const usePatchResolutionResolve = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<InventoryResolution[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onResetError = () => {
    setData([]);
    setError(null);
  };

  const call = useCallback(
    async (resolutionId: number) => {
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
        const result = await client(resolutionId);

        setData(result);
        setStatus(FetchStatus.SUCCESS);
      } catch (err) {
        const messageKey =
          (err as Error)?.message ?? 'error.patchResolutionResolveFetch';
        setError(messageKey);
        setStatus(FetchStatus.ERROR);
      }
    },
    [status]
  );

  const reset = useCallback(() => {
    setStatus(FetchStatus.IDLE);
    setData([]);
    setError(null);
  }, []);

  return {
    status,
    data,
    error,
    call,
    onResetError,
    reset,
    loading: status === FetchStatus.LOADING,
  };
};

export default usePatchResolutionResolve;
