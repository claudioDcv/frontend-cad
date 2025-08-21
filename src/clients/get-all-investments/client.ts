import { Option } from '@/entities/Option.entity';
import { getFetch } from '../customFetch';
import { remap } from './utils';

export default async (): Promise<Option[]> => getFetch<Option[]>('investments', { remap }, {
  responseError: 'error.getAllInvestmentsFetch',
  defaultError: 'error.getAllInvestmentsParse',
});
