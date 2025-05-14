import { sleep } from '../../utils';
import { Status } from './types';

const data: Status[] = [
  { value: 'pending', label: 'Pendiente' },
  { value: 'rejected', label: 'Rechazadas' },
  { value: 'approved', label: 'Aceptadas' },
];


const client = async () => {
  await sleep(2000);
  return data;
};

export default client;