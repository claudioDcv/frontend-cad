export interface InventoryItem {
  inventoryTypeId: number;
  weight: number;
  quantity: number;
}

export interface Send {
  success: boolean;
  message: string;
  legacyId: number;
  resolutionId: number;
  itemsProcessed: number;
  items: InventoryItem[];
}
