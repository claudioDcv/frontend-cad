import { Option } from '../../types';

export interface ResolutionFormModel {
  page: number;
  categoryId: Option;
  status: Option;
  investment: Option;
  location: Option;
  range: [Date, Date];
}

export interface ContractFormModel {
  resolutionId?: Option;
  clientRut?: string;
  responsible?: string;
  expirationBefore?: Date;
  contractId?: Option;
}

export interface PackingListFormModel {
  page: number
  categoryId: Option;
  status: Option;
  investment: Option;
  location: Option;
  range: [Date, Date];
  docNumber: string;
}