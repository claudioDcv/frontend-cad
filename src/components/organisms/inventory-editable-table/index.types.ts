import { InventoryResolution } from '@/entities/InventoryResolution.entity';
import { InventoryItem } from '@/entities/Send.entity';

interface Total {
  quantity: number;
  weight: number;
}

export interface EditableTableProps {
  total: Total;
  resolutionInventory: InventoryResolution[];
  onChange: (updatedItem: InventoryItem) => void;
}
