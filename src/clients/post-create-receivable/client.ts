import { CreateReceivable } from '@/entities/CreateReceivable.entity';
import { postFetch } from '../customFetch';

export default async (receivable: CreateReceivable): Promise<unknown> => postFetch('receivables', receivable, {}, {
  responseError: 'error.postCreateReceivableFetch',
  defaultError: 'error.postCreateReceivableParse',
});
