import { ResolutionInventory } from '@/entities/ResolutionInventory.entity';

export const getBody = (data: ResolutionInventory): string => JSON.stringify(data.inventories.map((i) => ({
  inventoryTypeId: Number(i.inventoryType.value),
  weight: i.weight,
  quantity: i.quantity,
})));
