import { InventoryType } from './InventoryType.entity';

export enum InventoryValue {
  Quantity = 'quantity',
  Weight = 'weight',
}

export interface Inventory {
  inventoryType: InventoryType;
  weight: number;
  quantity: number;
}
