import { Contract } from '@/entities/Contract.entity';
import client from './client';
import useAsyncCall from '@/hooks/useAsyncCall';

const useGetContract = () =>
  useAsyncCall<string | number, Contract | null>({
    client,
    initial: null,
  });

export default useGetContract;
