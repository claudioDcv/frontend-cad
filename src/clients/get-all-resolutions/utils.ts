import { mapMeta } from '../utils';
import { PageResponse, ResolutionPaginated } from './types';

export const remap = (data: PageResponse): ResolutionPaginated => {
    return {
        resolutions: data.content,
        meta: mapMeta(data),
  };
}