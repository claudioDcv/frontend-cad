import { Investment } from '@/entities/Investment.entity';
import { getFetch } from '../customFetch';

export default async (): Promise<Investment[]> => getFetch<Investment[]>('investments', {}, {
  responseError: 'error.getAllInvestmentsFetch',
  defaultError: 'error.getAllInvestmentsParse',
});
