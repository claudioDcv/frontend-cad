import { IconList } from '../components';
import { statusToKeyMap } from '../constants';
import Token from '../tokens';
import { icons } from '../components/molecules/icon/icons';
import { MaterialType } from '../components/molecules/material-type';
import { Material, Size } from '../components/molecules/material-type/types';

export const STATUS_RESOLUTION = 14;
export const STATUS_PACKING_LIST = 32;

export const FIRST_PAGE = 0;
export const FIRST_PAGE_MANUAL = 1;
export const ITEMS_PER_PAGE = 20;

export const LOCATION_ACTIVE = true;
export const LOCATION_INACTIVE = false;

export const SEARCH_DELAY = 300;

export const toDay = new Date();
export const defaultEndDate = new Date(
  toDay.getFullYear(),
  toDay.getMonth() + 1,
  0
);
export const defaultStartDate = new Date(
  toDay.getFullYear() - 5,
  toDay.getMonth(),
  1
);

export const emptyOption = { value: 'all', label: 'TODOS' };
export const isOnlyNumbersOrEmpty = (value: string) => /^\d*$/.test(value);


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

export function formatToDDMMYYYY(dateInput: string | undefined) {
  if (!dateInput) return '';

  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    console.error('Fecha inválida proporcionada:', dateInput);
    return '';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatNumberWithGr(value: string | number) {
  if (typeof value !== 'number' || isNaN(value)) {
    console.error('Entrada inválida. Se esperaba un número:', value);
    return '';
  }

  const formattedNumber = value.toLocaleString('es-ES');

  return `${formattedNumber} gr`;
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(value);
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
  size: Size = 'medium',
): React.ReactNode => {
  const material = materialMap[categoryId];

  if (!material) return label;

  return <MaterialType material={material} label={label} size={size} />;
};
