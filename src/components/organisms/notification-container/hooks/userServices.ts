import { useEffect } from 'react';
import { FetchStatus } from '@/constants';
import { useGetAllNotifications, useGetUnviewedNotifications } from '@/clients';
import { defaultNotificationFormValues } from '@/pages/common/documents/utils';

const useServices = () => {
  const getUnviewedNotifications = useGetUnviewedNotifications();
  const getAllNotifications = useGetAllNotifications();

  useEffect(() => {
    if (getUnviewedNotifications.status === FetchStatus.IDLE) {
      getUnviewedNotifications.call();
    }

    if (getAllNotifications.status === FetchStatus.IDLE) {
      getAllNotifications.call({
        ...defaultNotificationFormValues,
      });
    }
  }, [getAllNotifications, getUnviewedNotifications]);

  return {
    getUnviewedNotifications,
    getAllNotifications,
  };
};

export default useServices;
