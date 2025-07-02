import { Location } from '@/entities/Location.entity';

export const remap = (data: Location[]) => {
  return data.map((item: Location) => ({
    label: item.locationName,
    value: item.locationId.toString(),
  }));
};
