import { Resolution } from '@/entities/Resolution.entity';

interface Total {
  quantity: number;
  weight: number;
}

export interface ActionsResolutionProps {
  expected: Total;
  current: Total;
  resolution: Resolution;
  onClose: () => void;
  onSuccess: (resolution: Resolution) => void;
  loading: boolean;
}
