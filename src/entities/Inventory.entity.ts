import { InventoryType } from './InventoryType.entity';

export interface Inventory {
  inventoryType: InventoryType;
  weight: number;
  quantity: number;
}
