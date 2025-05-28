export interface Jewel {
  id: string;
  label: string;
}

export interface Contract {
  id: string;
  jewels: Jewel[];
}

export interface Option {
  label: string;
  value: string;
}

export type PropsResolution = {
  page: number;
  size?: number;
  sort?: string;
  investmentId?: number;
  locationId?: number;
  categoryId?: number;
  stateId?: number;
  startDate?: string;
  endDate?: string;
};
