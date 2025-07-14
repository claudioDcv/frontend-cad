import { useEffect } from 'react';
import { FetchStatus } from '@/constants';
import { useGetUnviewedNotifications } from '@/clients';

const useServices = () => {
  const getUnviewedNotifications = useGetUnviewedNotifications();

  useEffect(() => {
    if (getUnviewedNotifications.status === FetchStatus.IDLE) {
      getUnviewedNotifications.call();
    }
  }, [getUnviewedNotifications]);

  return {
    getUnviewedNotifications,
  };
};

export default useServices;
