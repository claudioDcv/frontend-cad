interface Total {
  quantity: number;
  weight: number;
}

export interface ButtonResolutionProps {
  expected: Total;
  actual: Total;
  onClose: () => void;
  onSuccess: () => void;
  loading: boolean;
}
