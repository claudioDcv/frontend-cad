export interface Data {
  inventory: string;
  quantity: number;
  weight: number;
}

interface Total {
  quantity: number;
  weight: number;
}

export interface EditableTableProps {
  total: Total;
  onTotalsChange: (totals: Total) => void;
}
