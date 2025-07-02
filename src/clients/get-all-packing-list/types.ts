import { PackingList } from '@/entities/PackingList.entity';
import { Pageable, Sort } from '../types';

export type PackingListQuery = {
  page: number;
  size?: number;
  sort?: string;
  packinglistId?: string;
  investmentId?: string;
  originLocationId?: string;
  destinyLocationId?: string;
  categoryId?: string;
  statusId?: string;
  startDate?: string;
  endDate?: string;
};

export type PackingListPaginated = {
  packingList: PackingList[];
  meta: {
    page: number;
    count: number;
  };
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
