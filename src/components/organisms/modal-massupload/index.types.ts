import { Resolution } from "@/entities/Resolution.entity";

export type Item = {
  value: string;
  label: string;
};

export type SuccessData = {
  units: number;
  grams: number;
};

export interface ModalMassUploadProps {
  resolution: Resolution;
  open: boolean;
  onClose: () => void;
  onSuccess: (data: SuccessData) => void;
}
