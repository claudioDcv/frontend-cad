import client from './client';
import useFetch from '@/hooks/useFetch';
import { remap } from './utils';
import { InventoryType } from '@/entities/InventoryType.entity';

const useGetAllInventoryTypes = () => {
  const { status, data, error, call } = useFetch({
    client,
    remap,
  });

  return {
    status,
    data: (data || []) as InventoryType[],
    error,
    call
  };
};

export default useGetAllInventoryTypes;
