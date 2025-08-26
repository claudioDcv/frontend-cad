import useAsyncCall from '@/hooks/useAsyncCall';
import client from './client';
import { UpdateReceivable } from '@/entities/UpdateReceivable.entity';

const usePatchUpdateReceivable = () => useAsyncCall<UpdateReceivable, unknown>({
  client,
  initial: {},
});

export default usePatchUpdateReceivable;
