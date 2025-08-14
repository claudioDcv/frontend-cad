import { useEffect } from 'react';
import { FetchStatus } from '@/constants';
import { useGetAllNotifications, useGetUnviewedNotifications } from '@/clients';
import { defaultNotificationFormValues } from '@/pages/common/documents/utils';

interface UseServicesProps {
  unviewedNotifications?: boolean;
  allNotifications?: boolean;
}

const useServices = ({
  unviewedNotifications,
  allNotifications,
}: UseServicesProps) => {
  const getUnviewedNotifications = useGetUnviewedNotifications();
  const getAllNotifications = useGetAllNotifications();

  useEffect(() => {
    if (getUnviewedNotifications.status === FetchStatus.IDLE && unviewedNotifications) {
      getUnviewedNotifications.call();
    }

    if (getAllNotifications.status === FetchStatus.IDLE && allNotifications) {
      getAllNotifications.call(defaultNotificationFormValues);
    }
  }, [allNotifications, getAllNotifications, getUnviewedNotifications, unviewedNotifications]);

  return {
    getUnviewedNotifications,
    getAllNotifications,
  };
};

export default useServices;
