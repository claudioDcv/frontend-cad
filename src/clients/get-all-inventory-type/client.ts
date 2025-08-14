import { getFetch } from '../customFetch';
import { InventoryTypeResponse } from './types';

export default async (): Promise<InventoryTypeResponse[]> => getFetch<InventoryTypeResponse[]>('inventory-types/all', {}, {
  responseError: 'error.getAllInventoryTypesFetch',
  defaultError: 'error.getAllInventoryTypesParse',
});
