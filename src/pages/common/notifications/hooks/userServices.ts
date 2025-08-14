import { useEffect } from 'react';
import { FetchStatus } from '@/constants';
import { useGetAllNotifications, useGetUnviewedNotifications } from '@/clients';
import { defaultNotificationFormValues } from '@/pages/common/documents/utils';
import usePathViewedNotification from '@/clients/path-viewed-notification';

interface UseServicesProps {
  unviewedNotifications?: boolean;
  allNotifications?: boolean;
}

const useServices = ({
  unviewedNotifications,
  allNotifications,
}: UseServicesProps) => {
  const pathViewedNotification = usePathViewedNotification();
  const getUnviewedNotifications = useGetUnviewedNotifications();
  const getAllNotifications = useGetAllNotifications({ isReinvocable: true });

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
    pathViewedNotification,
  };
};

export default useServices;
