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
import { Material, Size } from '../components/molecules/material-type/types';
import { Option } from '@/entities/Option.entity';

export const toDay = () => new Date();

export const defaultEndDate = new Date(
  toDay().getFullYear(),
  toDay().getMonth() + FIRST_DAY,
  LAST_DAY_OF_PREVIOUS_MONTH
);

export const defaultStartDate = new Date(
  toDay().getFullYear() - FIVE_YEARS_AGO,
  toDay().getMonth(),
  FIRST_DAY
);

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

export const formatDateHour = (dateInput?: Date | string | number) => {
  if (!dateInput) return '';
  const date =
    typeof dateInput === 'number' || typeof dateInput === 'string'
      ? new Date(dateInput)
      : dateInput;

  // Verifica si la fecha es válida
  if (isNaN(date.getTime())) {
    console.error('Fecha y hora inválida proporcionada:', dateInput);
    return '';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

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

export const orVoidString = (value: string | undefined | null): string => {
  return value ?? '';
};

export const orFalseBoolean = (value: boolean | undefined | null): boolean => {
  return value ?? false;
};

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

export const getMaterial = (categoryId: string): Material => {
  return materialMap[categoryId];
};

export const getStatusLabel = (
  id: string | number,
  options: Option[] = []
): string => {
  const idStr = id.toString();
  const found = options.find((opt) => opt.value === idStr);
  return found?.label ?? idStr;
};

export function preciseSum(numbers: number[]): number {
  const decimalCounts = numbers.map((n) => {
    const [, decimals] = n.toString().split('.');
    return decimals ? decimals.length : 0;
  });

  const maxDecimals = Math.max(...decimalCounts);
  const multiplier = BigInt('1' + '0'.repeat(maxDecimals));

  const total = numbers.reduce((acc, n) => {
    const scaled = BigInt(
      n
        .toString()
        .replace('.', '')
        .padEnd(maxDecimals + n.toString().split('.')[0].length, '0')
    );
    return acc + scaled;
  }, BigInt(0));

  return Number(total) / Number(multiplier);
}

export const pluralize = (value: number, singular: string, plural: string) => {
  if (value === 1) return singular;
  return plural;
};
