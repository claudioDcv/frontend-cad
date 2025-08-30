import useAsyncCall from '@/hooks/useAsyncCall';
import client from './client';
import { PackingListContract } from '@/entities/PackingListDetail.entity';

const useGetPackingListContracts = () =>
  useAsyncCall<string | number, PackingListContract[]>({
    client,
    initial: [],
  });

export default useGetPackingListContracts;
