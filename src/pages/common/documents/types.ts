import { Option } from '@/entities/Option.entity';

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

export interface NotificationFormModel {
  page: number;
}
