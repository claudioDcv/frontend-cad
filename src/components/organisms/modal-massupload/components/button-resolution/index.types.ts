interface Total {
  quantity: number;
  weight: number;
}

export interface ButtonResolutionProps {
  expected: Total;
  current: Total;
  onClose: () => void;
  onSuccess: () => void;
  loading: boolean;
}
