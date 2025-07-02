import { Status } from '@/entities/Status.entity';

export const remap = (data: Status[]) => {
  return data.map((item: Status) => ({
    value: item.statusId.toString(),
    label: item.statusName,
  }));
};
