import { Investment } from "@/entities/Investment.entity";
import { Option } from '@/entities/Option.entity';

export const remap = (data: Investment[]): Option[] => {
  return data.map((item: Investment) => ({
    label: item.investmentName,
    value: item.investmentId.toString(),
  }));
}
