import { UpdateReceivable } from '@/entities/UpdateReceivable.entity';
import { patchFetch } from '../customFetch';

export default async (receivable: UpdateReceivable): Promise<unknown> => {
  const body: Partial<UpdateReceivable> = {};
  if (receivable.administratorNote) {
    body.administratorNote = receivable.administratorNote;
  }
  if (typeof receivable.status === 'boolean') {
    body.status = receivable.status;
  }
  return patchFetch(
    `receivables/${receivable.id}`,
    body,
    {},
    {
      responseError: 'error.patchUpdateReceivableFetch',
      defaultError: 'error.patchUpdateReceivableParse',
    }
  );
};
