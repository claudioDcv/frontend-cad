export interface FormModel {
  materialType: string;
  status: string;
  investment: string;
  branch: string;
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
