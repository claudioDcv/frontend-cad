import { MaterialType } from "@/entities/MaterialType.entity";

export const remap = (data: MaterialType[]) => data.map((item: MaterialType) => ({
  label: item.categoryName,
  value: item.categoryId.toString(),
}));
