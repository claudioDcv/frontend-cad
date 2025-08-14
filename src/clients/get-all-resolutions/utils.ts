import { Resolution } from '@/entities/Resolution.entity';
import { PageResponse } from '../types';
import { mapMeta } from '../utils';
import { ResolutionPaginated } from './types';

export const remap = (data: PageResponse<Resolution>): ResolutionPaginated => ({
  resolutions: data.content,
  meta: mapMeta(data),
});

export const initialResolutiontData: ResolutionPaginated = {
  resolutions: [],
  meta: {
    page: 0,
    count: 0,
  },
};
