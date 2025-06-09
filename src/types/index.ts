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