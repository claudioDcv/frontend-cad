import { Pageable, Sort } from "../types";

export type PropsContract = {
  resolutionId?: string;
  clientRut?: string;
  responsible?: string;
  expirationBefore?: string;
  contractId?: string;
};

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
  stateName: string;
};

export type ContractPaginated = {
  contracts: Contract[];
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
