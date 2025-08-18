import { Contract } from '@/entities/Contract.entity';
import client from './client';
import useFetch from '@/hooks/useFetch';

const useGetContract = () => {
  const { status, data, error, call, clearData } = useFetch<Contract>({
    client,
  });

  return { status, data, error, call, clearData };
};

export default useGetContract;
