export interface PaginationMeta {
  page: number;
  count: number;
}

export type Pageable = {
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

export type Sort = {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
};
