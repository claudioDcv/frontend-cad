import client from './client';
import { Option } from '@/entities/Option.entity';
import useAsyncCall from '@/hooks/useAsyncCall';


const useGetAllInvestments = () => {
  const { status, data, error, call } = useAsyncCall<void, Option[]>({
    client,
    initialData: [],
  });

  return {
    status,
    data: data || [],
    error,
    call,
  };
};

export default useGetAllInvestments;
