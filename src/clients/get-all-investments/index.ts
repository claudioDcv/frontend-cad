import client from './client';
import { remap } from './utils';
import useFetch from '@/hooks/useFetch';
import { Option } from '@/entities/Option.entity';


const useGetAllInvestments = () => {
  const { status, data, error, call, clearData } = useFetch<Option[]>({
    client,
    remap,
    initialData: [],
  });

  return {
    status,
    data: data || [],
    error,
    call,
    clearData: () => clearData([]),
  };
};

export default useGetAllInvestments;
