import { PageResponse, PackingListPaginated } from './types';

export const remap = (data: PageResponse): PackingListPaginated => {
    return {
        packingList: data.content,
        meta: {
            page: data.number,
            count: data.totalPages - 1,
        },
  };
}