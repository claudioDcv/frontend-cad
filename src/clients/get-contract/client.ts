import { Contract } from '@/entities/Contract.entity';
import { getFetch } from '../customFetch';

export default async (id: string | number): Promise<Contract | null> =>
  getFetch(
    `contracts/${id}`,
    {},
    {
      responseError: 'error.getContractFetch',
      defaultError: 'error.getContractParse',
    }
  );
