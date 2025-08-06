import { useCallback, useState } from 'react';
import { FetchStatus } from '@/constants';
import { Send } from '@/entities/Send.entity';
import client from './client';

const usePostResolutionSend = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Send | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onResetError = () => {
    setData(null);
    setError(null);
  };

  const call = useCallback(
    async (props: Send) => {
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
          (err as Error)?.message ?? 'error.getAllContractsFetch';
        setError(messageKey);
        setStatus(FetchStatus.ERROR);
      }
    },
    [status]
  );

  return {
    status,
    data,
    error,
    call,
    onResetError,
  };
};

export default usePostResolutionSend;
