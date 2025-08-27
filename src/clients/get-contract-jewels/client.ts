import { Jewel } from '@/entities/Jewel.entity';
import { getFetch } from '../customFetch';

export default async (contractId: number): Promise<Jewel[]> =>
  getFetch(
    `contracts/${contractId}/jewels`,
    {},
    {
      responseError: 'error.getContractJewelsFetch',
      defaultError: 'error.getContractJewelsParse',
    }
  );
