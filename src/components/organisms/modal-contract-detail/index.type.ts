import { Contract } from '../../../types';
import { Material } from '../../molecules/material-type/types';

export interface I18N {
  label: string;
  checkboxLabel: string;
  success: string;
  cancel: string;
}
export const initialStateI18n: I18N = {
  label: 'Label',
  checkboxLabel: 'Check Label',
  success: 'Success',
  cancel: 'Cancel',
};

export interface ModalContractDetailProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (checked: boolean) => void;
  material: Material;
  data: Contract;
  checked?: boolean;
  i18n?: Partial<I18N>;
}