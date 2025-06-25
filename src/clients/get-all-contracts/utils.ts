import { mapMeta } from '../utils';
import { PageResponse, ContractPaginated } from './types';

export const remap = (data: PageResponse): ContractPaginated => {
  return {
    contracts: data.content,
    meta: mapMeta(data),
  };
};

export const initialContractData: ContractPaginated = {
  contracts: [],
  meta: {
    page: 0,
    count: 0,
  },
};
