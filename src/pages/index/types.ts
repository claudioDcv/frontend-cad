import { Option } from '@/utils';

export interface ResolutionFormModel {
  page: number;
  categoryId: Option;
  status: Option;
  investment: Option;
  location: Option;
  range: [Date, Date];
  resolutionNumber: string;
}

export interface PackingListFormModel {
  page: number;
  categoryId: Option;
  status: Option;
  investment: Option;
  location: Option;
  range: [Date, Date];
  docNumber: string;
}
