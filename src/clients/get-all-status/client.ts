import { Status } from '@/entities/Status.entity';
import { getFetch } from '../customFetch';
import { Props } from './types';

export default async (props: Props): Promise<Status[]> => {
  const query = new URLSearchParams({
    tableId: String(props.tableId),
  }).toString();

  return getFetch(
    `status?${query}`,
    {},
    {
      responseError: 'error.getAllStatusFetch',
      defaultError: 'error.getAllStatusParse',
    }
  );
};
