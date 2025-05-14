import { sleep } from '../../utils';
import { Branch } from './types';

const data: Branch[] = [
  { value: 'santiago', label: 'Santiago' },
  { value: 'valparaiso', label: 'Valparaíso' },
  { value: 'concepcion', label: 'Concepción' },
];

const client = async () => {
  await sleep(2000);
  return data;
};

export default client;
