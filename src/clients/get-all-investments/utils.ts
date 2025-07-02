import { Investment } from "@/entities/Investment.entity";

export const remap = (data: Investment[]) => {
  return data.map((item: Investment) => ({
    label: item.investmentName,
    value: item.investmentId.toString(),
  }));
}
