import { PageResponse, ContractPaginated } from './types';

export const remap = (data: PageResponse): ContractPaginated => {
  return {
    contracts: data.content,
  };
};
