import { Inventory } from "./Inventory.entity";

export interface ResolutionInventory {
    id: number;
    inventories: Inventory[];
}
