import { Contract } from '@/entities/Contract.entity';
import { getFetch } from '../customFetch';

export default async (id: string): Promise<Contract> => getFetch(`contracts/${id}`, {}, {
  responseError: 'error.getContractFetch',
  defaultError: 'error.getContractParse',
});
