import { useState, useCallback } from 'react';
import { FetchStatus } from '@/constants';
import client from './client';
import { NotificationFormModel } from '@/pages/common/documents/types';
import { Notification } from '@/entities/Notification.entity';
import { Paginated } from '../types';
import { initialPaginatedData } from '../utils';

const useGetAllNotifications = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Paginated<Notification>>(
    initialPaginatedData
  );
  const [error, setError] = useState<string | null>(null);

  const onResetError = () => {
    setData(initialPaginatedData);
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
        const result = await client(props);

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
