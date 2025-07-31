export interface InventoryResolution {
  id: number;
  resolutionId: number;
  inventoryTypeId: number;
  inventoryTypeName: string | null;
  weight: number;
  quantity: number;
  totalWeight: number;
  createdBy: number;
  updatedBy: number;
}

// todo:
// no hace falta el inventorytypename porque es un inner join extra, y solo se necesita el id
