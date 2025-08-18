import { getFetch } from '../customFetch';

export default async (id: string): Promise<unknown> => getFetch(`contracts/${id}`, {}, {
  responseError: 'error.getContractFetch',
  defaultError: 'error.getContractParse',
});
