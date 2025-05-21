import { Status } from './types';

export const remap = (data: Status[]) => {
  return data.map((item: Status) => ({
    label: item.statusName,
    value: item.statusId.toString(),
  }));
};
