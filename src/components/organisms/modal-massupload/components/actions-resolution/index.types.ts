interface Total {
  quantity: number;
  weight: number;
}

export interface ActionsResolutionProps {
  expected: Total;
  current: Total;
  onClose: () => void;
  onSuccess: () => void;
  onSendOutput: () => void;
  loading: boolean;
}
