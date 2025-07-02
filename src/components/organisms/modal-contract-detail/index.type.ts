import { Material } from '../../molecules/material-type/types';
import { Jewel } from '@/entities/Jewel.entity';

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

export interface ContractHeaderData {
  clientRut?: string;
  weight?: number;
  totalContractValue?: number;
  averagePurchaseValue?: number;
  responsibleName?: string;
  clientName?: string;
  endDate?: string;
}

export interface ModalContractDetailProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (checked: boolean) => void;
  material: Material;
  data: { contractId: number | null; jewels: Jewel[] };
  checked?: boolean;
  contractData?: ContractHeaderData;
  i18n?: Partial<I18N>;
}
