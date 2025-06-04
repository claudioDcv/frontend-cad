import { PageResponse, ResolutionPaginated } from './types';

export const remap = (data: PageResponse): ResolutionPaginated => {
    return {
        resolutions: data.content,
        meta: {
            page: data.number ,
            count: data.totalPages ,
        },
  };
}