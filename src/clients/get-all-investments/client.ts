import { sleep } from '../../utils';
import { Investment } from './types';

const data: Investment[] = [
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Media' },
  { value: 'baja', label: 'Baja' },
];

const client = async () => {
  await sleep(2000);
  return data;
};

export default client;
