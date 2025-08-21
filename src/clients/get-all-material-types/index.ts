import client from './client';
import { Option } from '@/entities/Option.entity';
import useAsyncCall from '@/hooks/useAsyncCall';


const useGetAllMaterialTypes = () => {
  return useAsyncCall<void, Option[]>({
    client,
    initialData: [],
  });
};

export default useGetAllMaterialTypes;
