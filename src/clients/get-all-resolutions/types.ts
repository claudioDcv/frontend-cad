import { Pageable, Sort } from "../types";

export type PropsResolution = {
  page: number;
  size?: number;
  sort?: string;
  investmentId?: string;
  locationId?: string;
  categoryId?: string;
  stateId?: string;
  startDate?: string;
  endDate?: string;
};

export type Resolution = {
  resolutionId: number;
  resolutionNumber: number;
  resolutionBarcode: string;
  dispatchGuideNumber: number;
  investmentName: string;
  branchName: string;
  closureDate: string;
  contractQuantity: number;
  jewelTotalCount: number;
  categoryName: string;
  stateName: string;
};

export type PageResponse = {
  content: Resolution[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
};

export type ResolutionPaginated = {
  resolutions: Resolution[];
  meta: {
    page: number;
    count: number;
  };
};
