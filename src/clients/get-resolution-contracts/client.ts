import { Contract } from '@/entities/Contract.entity';
import { remap } from './utils';
import { getFetch } from '../customFetch';

export default async (resolutionId: string | number): Promise<Contract[]> => {
  const url = `resolutions/${resolutionId}/contracts`;
  return getFetch<Contract[]>(url, {
    remap,
  }, {
    responseError: 'error.getAllContractsFetch',
    defaultError: 'error.getAllContractsParse',
  });
}
