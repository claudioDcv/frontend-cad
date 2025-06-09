import { Status } from './types';

export const remap = (data: Status[]) => {
  return data.map((item: Status) => ({
    value: item.statusId.toString(),
    label: item.statusName,
  }));
};
