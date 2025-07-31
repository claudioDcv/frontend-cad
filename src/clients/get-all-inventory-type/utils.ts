import { InventoryType } from '@/entities/InventoryType.entity';
import { InventoryTypeResponse } from './types';
import { allowedInventories } from '@/constants';

export const remap = (data: InventoryTypeResponse[]): InventoryType[] =>
  data
    .map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }))
    .filter((item) => allowedInventories.includes(item.label));
