import { useCallback, useState } from 'react';
import client from './client';
import { useTranslation } from 'react-i18next';
import { FetchStatus } from '../../utils';
import { Resolution } from './types';

const useGetResolution = () => {
  const { t } = useTranslation();

  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Resolution | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onResetError = () => {
    setData(null);
    setError(null);
  };

  const call = useCallback(
    async (id: string) => {
      setStatus(FetchStatus.LOADING);
      setError(null);
      try {
        const result = await client(id);
        setData(result);
        setStatus(FetchStatus.SUCCESS);
      } catch (err) {
        const messageKey = (err as Error)?.message ?? 'error.genericHttpError';
        setError(t(messageKey));
        setStatus(FetchStatus.ERROR);
      }
    },
    [t]
  );

  return { status, data, error, call, onResetError };
};

export default useGetResolution;
