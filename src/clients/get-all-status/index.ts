import client from './client';
import { Option } from '@/entities/Option.entity';
import useAsyncCall from '@/hooks/useAsyncCall';
import { Props } from './types';
import { remap } from './utils';

const useGetAllStatus = () =>
  useAsyncCall<Props, Option[]>({
    client: async (props) => {
      const result = await client(props);
      return remap(result);
    },
    initial: [],
  });

export default useGetAllStatus;
