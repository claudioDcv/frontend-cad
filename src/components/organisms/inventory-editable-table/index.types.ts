import { Inventory } from '@/entities/Inventory.entity';
import { InventoryResolution } from '@/entities/InventoryResolution.entity';
import { InventoryItem } from '@/entities/Send.entity';

export interface Total {
  quantity: number;
  weight: number;
}

export interface EditableTableProps {
  data: Inventory[];
  setData: (data: Inventory[]) => void;
  total: Total;
  resolutionInventory: InventoryResolution[];
  onChange: (updatedItem: InventoryItem) => void;
}
