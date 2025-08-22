import useAsyncCall from '@/hooks/useAsyncCall';
import { InventoryResolution } from '@/entities/InventoryResolution.entity';
import client from './client';
import { ResolutionInventory } from '@/entities/ResolutionInventory.entity';

const usePatchResolutionInventory = () => {
  return useAsyncCall<ResolutionInventory, InventoryResolution[]>({
    client,
    initial: [],
  });
};

export default usePatchResolutionInventory;
