import { Status } from './types';

export const remap = (data: Status[]) => {
  return data.map((item: Status) => ({
    label: item.name,
    value: item.id.toString(),
  }));
};
