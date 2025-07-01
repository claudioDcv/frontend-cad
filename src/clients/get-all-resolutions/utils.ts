import { mapMeta } from '../utils';
import { PageResponse, ResolutionPaginated } from './types';

export const remap = (data: PageResponse): ResolutionPaginated => ({
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
