import { Option } from '../../types';

export interface ResolutionFormModel {
  materialType: Option;
  status: Option;
  investment: Option;
  location: Option;
  dateRange: [Date, Date];
}

export interface ContractFormModel {
  resolutionId?: Option;
  clientRut?: string;
  responsible?: string;
  expirationBefore?: Date;
  contractId?: Option;
}

export interface PackingListFormModel {
  status: Option;
}