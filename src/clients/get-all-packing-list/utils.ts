import { mapMeta } from '../utils';
import { PageResponse, PackingListPaginated } from './types';

export const remap = (data: PageResponse): PackingListPaginated => {
  return {
    packingList: data.content,
    meta: mapMeta(data),
  };
};

export const cleanDate = (date?: string | Date): string => {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
};

export const initialPackingListData: PackingListPaginated = {
  packingList: [],
  meta: {
    page: 0,
    count: 0,
  },
};
