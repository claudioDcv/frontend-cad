import { Location } from './types';

export const remap = (data: Location[]) => {
  return data.map((item: Location) => ({
    label: item.locationName,
    value: item.locationId.toString(),
  }));
}
