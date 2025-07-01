import { MaterialType } from './types';

export const remap = (data: MaterialType[]) => {
  return data.map((item: MaterialType) => ({
    label: item.categoryName,
    value: item.categoryId.toString(),
  }));
}
