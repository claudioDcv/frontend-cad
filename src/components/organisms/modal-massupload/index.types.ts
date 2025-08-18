import { Inventory } from '@/entities/Inventory.entity';
import { Resolution } from '@/entities/Resolution.entity';

export type Item = {
  value: string;
  label: string;
};

export interface ModalMassUploadProps {
  resolution: Resolution;
  open: boolean;
  onClose: () => void;
  onSuccess: (data: Inventory[]) => void;
  onSendOutput: (data: Inventory[]) => void;
  loading: boolean;
}
