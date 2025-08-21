import client from './client';
import { Props } from './types';
import { Option } from '@/entities/Option.entity';
import useAsyncCall from '@/hooks/useAsyncCall';

const useGetAllLocations = () => {
  const response = useAsyncCall<Props, Option[]>({
    client,
    initialData: [],
  });

  return {
    ...response,
    data: response.data || [],
  };
};

export default useGetAllLocations;
