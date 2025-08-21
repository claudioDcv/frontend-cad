import { InventoryType } from '@/entities/InventoryType.entity';
import { getFetch } from '../customFetch';
import { remap } from './utils';

export default async (): Promise<InventoryType[]> => getFetch<InventoryType[]>('inventory-types/all', {
  remap,
}, {
  responseError: 'error.getAllInventoryTypesFetch',
  defaultError: 'error.getAllInventoryTypesParse',
});
