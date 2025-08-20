import { useCallback, useState } from 'react';
import { FetchStatus } from '@/constants';
import client from './client';
import { Resolution } from '@/entities/Resolution.entity';

/**
 * Este servicio se utiliza para que el operador envie la resolución a Olimpo y al Admin.
 * @returns 
 */
const usePatchSendResolution = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Resolution>();
  const [error, setError] = useState<string | null>(null);

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
        return result;
      } catch (err) {
        const messageKey =
          (err as Error)?.message ?? 'error.patchSendResolutionFetch';
        setError(messageKey);
        setStatus(FetchStatus.ERROR);
      }
    },
    [status]
  );

  const reset = useCallback(() => {
    setStatus(FetchStatus.IDLE);
    setData(undefined);
    setError(null);
  }, []);


  return { status, data, error, call, reset };
};

export default usePatchSendResolution;
