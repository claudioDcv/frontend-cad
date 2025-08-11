import { Resolution } from '@/entities/Resolution.entity';
import { InventoryItem } from '@/entities/Send.entity';

export type Item = {
  value: string;
  label: string;
};

export interface ModalMassUploadProps {
  resolution: Resolution;
  open: boolean;
  onClose: () => void;
  onSuccess: (data: InventoryItem[]) => void;
}
