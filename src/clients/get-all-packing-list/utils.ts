import { mapMeta } from '../utils';
import { PageResponse, PackingListPaginated } from './types';

export const remap = (data: PageResponse): PackingListPaginated => {
    return {
        packingList: data.content,
        meta: mapMeta(data),
  };
}