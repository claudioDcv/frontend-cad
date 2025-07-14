import { useState, useCallback } from 'react';
import { FetchStatus } from '@/constants';
import client from './client';
import { NotificationPaginated } from './index.types';
import { initialNotificationData } from './utils';
import { NotificationFormModel } from '@/pages/index/types';

const useGetAllNotifications = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<NotificationPaginated>(
    initialNotificationData
  );
  const [error, setError] = useState<string | null>(null);

  const onResetError = () => {
    setData(initialNotificationData);
    setError('');
  };

  const call = useCallback(
    async (props: NotificationFormModel) => {
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

export default useGetAllNotifications;
