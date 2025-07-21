export type Item = {
  value: string;
  label: string;
};

export interface I18N {
  label: string;
  success: string;
  cancel: string;
}

export const initialStateI18N: I18N = {
  label: 'Label',
  success: 'Guardar',
  cancel: 'Cancelar',
};

type SuccessData = {
  units: number;
  grams: number;
  cost: number;
};

export interface ModalMassUploadProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (data: SuccessData) => void;
  i18n?: Partial<I18N>;
}
