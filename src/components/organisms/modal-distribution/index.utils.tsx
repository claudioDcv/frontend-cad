import type { Option } from '@/entities/Option.entity';

// TODO: Translate labels

export const custodyDistribution: Option[] = [
  { value: 'gemology', label: 'Gemología' },
  { value: 'export', label: 'Exportación' },
  { value: 'watchmaking', label: 'Relojería' },
  { value: 'refining', label: 'Refinación' },
  { value: 'commercial', label: 'Comercial' },
  { value: 'cdp', label: 'CDP' },
];

export const distributionRows = [
  { id: 1, label: 'Inversión', value: '' },
  { id: 2, label: 'Unidades', value: '' },
  { id: 3, label: 'Peso', value: '' },
  { id: 4, label: 'Valor $', value: '' },
];

export const families: Option[] = [
  { value: 'ring', label: 'Anillo' },
  { value: 'hoop', label: 'Aro' },
  { value: 'pendant', label: 'Colgante' },
  { value: 'chain', label: 'Cadena' },
  { value: 'bracelet', label: 'Pulcera' },
  { value: 'specialjewel', label: 'Joya Especial' },
  { value: 'coin', label: 'Moneda' },
  { value: 'ingot', label: 'Lingote' },
  { value: 'watch', label: 'Reloj Neto' },
  { value: 'scrap', label: 'Scrap' },
];
