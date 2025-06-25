import { Pageable, Sort } from '../types';

export type Resolution = {
  resolutionId: string;
  resolutionNumber: string;
  barcode: string;
  dispatchGuide: number;
  investmentName: string;
  locationName: string;
  closeDate: string;
  contractCount: number;
  totalJewels: number;
  categoryName: string;
  categoryId: string;
  statusName: string;
  statusId: number;
  locationAddress: string;
  investmentRut: string;
  securityBag: string;
};

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

export type PageResponse = {
  totalPages: number;
  totalElements: number;
  pageable: Pageable;
  size: number;
  content: Resolution[];
  number: number;
  sort: Sort[];
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
};

