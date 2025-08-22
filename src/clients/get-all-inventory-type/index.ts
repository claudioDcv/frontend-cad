import client from './client';
import { InventoryType } from '@/entities/InventoryType.entity';
import useAsyncCall from '@/hooks/useAsyncCall';

const useGetAllInventoryTypes = () => useAsyncCall<void, InventoryType[]>({
  client,
  initial: [],
});

export default useGetAllInventoryTypes;
