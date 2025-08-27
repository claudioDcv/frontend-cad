import client from './client';
import useFetch from '@/hooks/useFetch';
import { initialPaginatedData } from '../utils';

const useGetAllNotifications = ({
  isReinvocable = false,
}: { isReinvocable?: boolean } = {}) => {
  const { status, data, error, call } = useFetch({
    client,
    initialData: initialPaginatedData,
    isReinvocable,
  });

  return {
    status,
    data: data as typeof initialPaginatedData,
    error,
    call,
  };
};

export default useGetAllNotifications;
