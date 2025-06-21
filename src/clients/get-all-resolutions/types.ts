import { Pageable, Sort } from '../types';
import { Option } from '../../types';

export type Resolution = {
  resolutionId: number;
  resolutionNumber: number;
  barcode: string;
  dispatchGuide: number;
  investmentName: string;
  locationName: string;
  closeDate: string;
  contractCount: number;
  totalJewels: number;
  categoryName: string;
  stateName: string;
  locationAddress: string;
  investmentRut: string;
  securityBag: string;
};

export type PropsResolution = {
  resolutionId?: number;
  resolutionNumber?: number;
  barcode?: string;
  dispatchGuide?: number;
  investmentId?: string;
  locationId?: string;
  categoryId?: string;
  stateId?: string;
  startDate?: string;
  endDate?: string;
  page: number;
  size?: number;
  sort?: string;
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

export type ResolutionFilters = {
  investment?: Option;
  location?: Option;
  materialType?: Option;
  status?: Option;
  range: [Date, Date];
};


export type ResolutionPaginated = {
  resolutions: Resolution[];
  meta: {
    page: number;
    count: number;
  };
};
