import { Jewel } from '@/entities/Jewel.entity';
import client from './client';
import useAsyncCall from '@/hooks/useAsyncCall';

const useGetContractJewels = () =>
  useAsyncCall<number, Jewel[]>({
    client,
    initial: [],
  });

export default useGetContractJewels;
