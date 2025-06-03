export type PropsContract = {
  page: number;
  size?: number;
  sort?: string;
  resolutionId?: number;
  clientRut?: string;
  responsible?: string;
  expirationBefore?: string;
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

type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged?: boolean;
  unpaged?: boolean;
};

type Sort = {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
};
