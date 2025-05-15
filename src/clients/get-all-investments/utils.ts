import { Investment } from "./types";

export const remap = (data: Investment[]) => {
  return data.map((item: Investment) => ({
    label: item.investmentName,
    value: item.investmentId.toString(),
  }));
}
