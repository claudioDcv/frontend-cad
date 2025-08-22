import client from './client';
import { Option } from '@/entities/Option.entity';
import useAsyncCall from '@/hooks/useAsyncCall';


const useGetAllInvestments = () => useAsyncCall<void, Option[]>({
  client,
  initial: [],
});

export default useGetAllInvestments;
