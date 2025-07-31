import { InventoryResolution } from '@/entities/InventoryResolution.entity';

interface Total {
  quantity: number;
  weight: number;
}

export interface EditableTableProps {
  total: Total;
  resolutionInventory: InventoryResolution[];
  onTotalsChange: (totals: Total) => void;
}
