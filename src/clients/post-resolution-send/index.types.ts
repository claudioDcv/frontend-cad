import { InventoryItem } from '@/entities/Send.entity';

export interface SendRequest {
  resolutionId: number;
  items: InventoryItem[];
}
