import { Option } from '../../types';

export const MATERIAL_OPTIONS: Option[] = [
  { label: 'ORO', value: 'Gold' },
  { label: 'PLATA', value: 'Silver' },
  { label: 'MARCA EXCLUSIVA', value: 'ExclusiveBrand' },
  { label: 'COLECCIONADO', value: 'Collected' },
];

export const getMaterialFromLabel = (label?: string): string | null => {
  if (!label) return null;
  const option = MATERIAL_OPTIONS.find(
    (opt) => opt.label.toUpperCase() === label.toUpperCase()
  );
  return option?.value ?? null;
};
