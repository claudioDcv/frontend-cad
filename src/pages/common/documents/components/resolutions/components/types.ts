import { Resolution } from '@/entities/Resolution.entity';

export interface ResolutionMassiveModalProps {
  resolution: Resolution | null;
  onClose: () => void;
}

export interface ResolutionSendTruckModalProps {
  id: number | null;
  onClose: () => void;
}

export interface ResolutionDetailButtonProps {
  id: string;
  label?: string;
}
