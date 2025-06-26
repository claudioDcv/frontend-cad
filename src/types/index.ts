export interface Jewel {
  number?: number;
  description?: string;
  family?: string;
  weight?: number;
  quantity?: number;
  value?: number;
}

export interface Contract {
  id: string;
  jewels: Jewel[];
}

export interface Option {
  label: string;
  value: string;
}