export type PackingList = {
  packinglistId: number;
  barcode: string;
  dispatchNumber: string;
  investmentName: string;
  originBranch: string;
  destinyBranch: string;
  creationDate: string;
  totalQuantity: number;
  totalGrams: number;
  documentType: string;
  statusId: number;
  statusName: string;
  category: string;
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

export type PageResponse = {
  content: PackingList[];
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

export type PropsPackingList = {
  page: number;
  size?: number;
  sort?: string;
  startDate?: string;
  endDate?: string;
  originCcId?: number;
  destinyCcId?: number;
  categoryId?: number;
  statusId?: string;
};

export type PackingListPaginated = {
  packingList: PackingList[];
  meta: {
    page: number;
    count: number;
  };
};