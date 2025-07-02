import { IconList } from '../components';
import { statusToKeyMap } from '../constants';
import Token from '../tokens';
import { icons } from '../components/molecules/icon/icons';
import { MaterialType } from '../components/molecules/material-type';
import { Material, Size } from '../components/molecules/material-type/types';

export const TAB_RESOLUTIONS = 0;
export const TAB_PACKING_LIST = 1;

export const STATUS_RESOLUTION = 14;
export const STATUS_PACKING_LIST = 32;

export const FIRST_PAGE_INDEX = 0;
export const FIRST_PAGE = 1;
export const ITEMS_PER_PAGE = 20;

export const FIVE_YEARS_AGO = 5;
export const FIRST_DAY = 1;
export const LAST_DAY_OF_PREVIOUS_MONTH = 0;

export const LOCATION_ACTIVE = true;
export const LOCATION_INACTIVE = false;

export const SEARCH_DELAY = 300;

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

export const emptyOption = { value: 'all', label: 'TODOS' };

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

export enum FetchStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const materialMap: Record<string, Material> = {
  1: 'Gold',
  2: 'Silver',
  3: 'Platinum',
  4: 'ExclusiveBrand',
  5: 'Steel',
  6: 'Accessory',
};

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
