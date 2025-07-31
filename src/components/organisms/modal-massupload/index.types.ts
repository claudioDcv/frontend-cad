export type Item = {
  value: string;
  label: string;
};

type SuccessData = {
  units: number;
  grams: number;
  cost: number;
};

export interface ModalMassUploadProps {
  documentId: string;
  open: boolean;
  onClose: () => void;
  onSuccess: (data: SuccessData) => void;
}
