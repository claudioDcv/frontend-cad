import { Option } from '@/entities/Option.entity';
import { getFetch } from '../customFetch';
import { remap } from './utils';

export default async (): Promise<Option[]> => getFetch<Option[]>('material-categories', {
  remap
}, {
  responseError: 'error.getAllMaterialTypesFetch',
  defaultError: 'error.getAllMaterialTypesParse',
});
