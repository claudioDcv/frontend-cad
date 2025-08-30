import { PackingListContract } from '@/entities/PackingListDetail.entity';
import { getFetch } from '../customFetch';

// TODO:
// Hacer las traducciones en locale

export default async (id: string | number): Promise<PackingListContract[]> =>
  getFetch(
    `packinglist/${id}`,
    {},
    {
      responseError: 'error.getPackingListFetch',
      defaultError: 'error.getPackingListParse',
    }
  );
