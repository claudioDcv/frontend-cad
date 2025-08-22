import { Resolution } from '@/entities/Resolution.entity';
import { PageResponse, Paginated } from '../types';
import { mapMeta } from '../utils';

export const remap = (data: PageResponse<Resolution>): Paginated<Resolution> => ({
  content: data.content,
  meta: mapMeta(data),
});

export const initial: Paginated<Resolution> = {
  content: [],
  meta: {
    page: 0,
    count: 0,
  },
};
