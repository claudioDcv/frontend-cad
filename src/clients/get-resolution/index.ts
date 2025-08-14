import { useCallback, useState } from 'react';
import { Resolution } from '@/entities/Resolution.entity';
import client from './client';
import { initialResolutionData } from './utils';
import { FetchStatus } from '@/constants';

const useGetResolution = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Resolution>(initialResolutionData);
  const [error, setError] = useState('');

  const onResetError = () => {
    setData(initialResolutionData);
    setError('');
  };

  const call = useCallback(async (id: number | string) => {
    setStatus(FetchStatus.LOADING);
    setError('');
    try {
      const result = await client(id);
      if (!result) {
        throw new Error('error.resolutionNotFound');
      }
      setData(result);
      setStatus(FetchStatus.SUCCESS);
    } catch (err) {
      const messageKey = (err as Error)?.message ?? 'error.genericHttpError';
      setError(messageKey);
      setStatus(FetchStatus.ERROR);
    }
  }, []);

  return { status, data, error, call, onResetError };
};

export default useGetResolution;
