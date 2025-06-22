import { Pageable, Sort } from "../types";
import { Option } from '../../types';

export type PackingList = {
  packinglistId: string;
  barcode: string;
  dispatchNumber: string;
  investmentName: string;
  originLocation: string; 
  destinyLocation: string; 
  creationDate: string;
  totalQuantity: number;
  totalGrams: number;
  documentType: string;
  statusId: number;
  statusName: string;
  categoryName: string;  
};

export type PropsPackingList = {
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

export type PackingListFilters = {
  investmentId?: string;
  investment?: Option;
  location?: Option;
  materialType?: Option;
  status?: Option;
  range: [Date, Date];
};
