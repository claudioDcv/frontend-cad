import { Pageable, Sort } from '../types';

export type Contract = {
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
  statusName: string;
  totalWeight: string;
  startDate: string;
  endDate: string;
  contractNumber: string;
  totalContractValue: number;
  averagePurchaseValue: number;
};

export type ContractQuery = {
  page: number;
  size?: number;
  sort?: string;
  resolutionId?: string;
  clientRut?: string;
  responsible?: string;
  expirationBefore?: string;
  contractNumber?: string;
};

export type ContractPaginated = {
  contracts: Contract[];
  meta: {
    page: number;
    count: number;
  };
};

export type PageResponse = {
  content: Contract[];
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
