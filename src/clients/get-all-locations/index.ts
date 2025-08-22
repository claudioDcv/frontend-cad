import client from './client';
import { Props } from './types';
import { Option } from '@/entities/Option.entity';
import useAsyncCall from '@/hooks/useAsyncCall';

const useGetAllLocations = () => useAsyncCall<Props, Option[]>({
  client,
  initial: [],
});

export default useGetAllLocations;
