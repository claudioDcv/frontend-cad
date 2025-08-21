import client from './client';
import { InventoryType } from '@/entities/InventoryType.entity';
import useAsyncCall from '@/hooks/useAsyncCall';

const useGetAllInventoryTypes = () => {
  const { status, data, error, call } = useAsyncCall<void, InventoryType[]>({
    client,
  });

  return {
    status,
    data: data || [],
    error,
    call
  };
};

export default useGetAllInventoryTypes;
