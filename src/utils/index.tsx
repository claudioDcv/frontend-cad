import { IconList } from '../components';
import {
  FIRST_DAY,
  FIVE_YEARS_AGO,
  LAST_DAY_OF_PREVIOUS_MONTH,
  materialMap,
  statusToKeyMap,
} from '../constants';
import Token from '../tokens';
import { icons } from '../components/molecules/icon/icons';
import { MaterialType } from '../components/molecules/material-type';
import { Size } from '../components/molecules/material-type/types';

export const toDay = new Date();
export const defaultEndDate = new Date(
  toDay.getFullYear(),
  toDay.getMonth() + FIRST_DAY,
  LAST_DAY_OF_PREVIOUS_MONTH
);
export const defaultStartDate = new Date(
  toDay.getFullYear() - FIVE_YEARS_AGO,
  toDay.getMonth(),
  FIRST_DAY
);

export interface Option {
  label: string;
  value: string;
}

export const isOnlyNumbersOrEmpty = (value: string) => /^\d*$/.test(value);

export function parseOptionalNumber(
  value: string | undefined
): number | undefined {
  if (value === undefined) return undefined;
  const parsed = Number(value);
  return isNaN(parsed) ? undefined : parsed;
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function debounce<A extends unknown[]>(
  func: (...args: A) => void,
  wait: number
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: A) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
  return debounced;
}

export const cleanDate = (date?: string | Date): string => {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
};

export const formatDate = (date?: Date) => date?.toISOString().split('T')[0];

export function formatToDDMMYYYY(dateInput: string | undefined) {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatNumberWithGr(value: string | number | null) {
  if (typeof value !== 'number' || isNaN(value)) return '';
  const formattedNumber = value.toLocaleString('es-ES');
  return `${formattedNumber} gr`;
}

export const formatCurrency = (value: number | null) => {
  if (typeof value !== 'number' || isNaN(value)) return '';
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(value);
};

export function toOptional<T>(value: T | undefined | null): T | undefined {
  return value ?? undefined;
}

export const getStatusIcon = (statusId: number, statusName?: string) => {
  const key = statusToKeyMap[statusId];
  const fallback = {
    name: 'note',
    color: Token.Color.Neutral,
    description: statusName ?? '',
  };
  const { name, color, description } = key ? Token.IconTemplate[key] : fallback;
  return (
    <IconList
      name={name as keyof typeof icons}
      color={color}
      description={statusName || description}
    />
  );
};

export const getMaterialType = (
  label: string,
  categoryId: string,
  size: Size | 'tooltip' = 'medium'
): React.ReactNode => {
  const material = materialMap[categoryId];
  const sizeProp = size === 'tooltip' ? 'small' : size;
  if (!material) return label;
  return (
    <MaterialType
      material={material}
      label={label}
      size={sizeProp}
      tooltip={size === 'tooltip'}
    />
  );
};
