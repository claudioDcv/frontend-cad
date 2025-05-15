import { Option } from "../../types";

export interface FormModel {
  materialType: Option;
  status: Option;
  investment: Option;
  branch: Option;
  dateRange: [Date, Date];
}

export type ResolutionModel = {
  id: number;
  number: number;
  code: string;
  name: string;
  alias: string;
  address: string | null;
  manager: string | null;
  email: string | null;
  phone: string | null;
};
