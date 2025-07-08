import { Contract } from '@/entities/Contract.entity';
import { Material } from '../../molecules/material-type/types';

export interface I18N {
  label: string;
  checkboxLabel: string;
  success: string;
  cancel: string;
  weight: string;
  totalContractValue: string;
  averagePurchaseValue: string;
  responsible: string;
  expiration: string;
  client: string;
  clientRut: string;
}

export const initialStateI18n: I18N = {
  label: 'Label',
  checkboxLabel: 'Check Label',
  success: 'Success',
  cancel: 'Cancel',
  weight: 'Contract weight',
  totalContractValue: 'Purchase amount',
  averagePurchaseValue: 'Average purchase',
  responsible: 'Responsible',
  expiration: 'Expiration',
  client: 'Client',
  clientRut: 'RUT',
};

export interface ModalContractDetailProps {
  onClose: () => void;
  onSuccess: (contract: Contract) => void;
  material: Material;
  contract?: Contract | null;
  i18n?: Partial<I18N>;
  editable?: boolean;
}
