import { mapMeta } from '../utils';
import { PageResponse, PackingListPaginated } from './types';

export const remap = (data: PageResponse): PackingListPaginated => {
  return {
    packingList: data.content,
    meta: mapMeta(data),
  };
};

export const initialPackingListData: PackingListPaginated = {
  packingList: [],
  meta: {
    page: 0,
    count: 0,
  },
};
