import { Resolution } from '@/entities/Resolution.entity';

export type ResolutionQuery = {
  resolutionId?: string;
  resolutionNumber?: string;
  barcode?: string;
  dispatchGuide?: number;
  investmentId?: string;
  locationId?: string;
  categoryId?: string;
  statusId?: string;
  statusName?: string;
  startDate?: string;
  endDate?: string;
  hasMetadata?: boolean;
  page: number;
  size?: number;
  sort?: string;
};

export type ResolutionPaginated = {
  resolutions: Resolution[];
  meta: {
    page: number;
    count: number;
  };
};
