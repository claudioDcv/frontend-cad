import { clearProp, clearAllProps } from '../utils';
import { Props } from './types';
import { remap } from './utils';
import { Option } from '@/entities/Option.entity';
import { getFetch } from '../customFetch';

export default async (props: Props): Promise<Option[]> => {
  const params = {
    investmentId: clearProp(props.investmentId),
    status: clearProp(props.status),
  };

  const query = new URLSearchParams(clearAllProps(params));
  const url = `locations?${query}`;
  return getFetch<Option[]>(url, { remap }, {
    responseError: 'error.getAllInvestmentsFetch',
    defaultError: 'error.getAllInvestmentsParse',
  });
}
