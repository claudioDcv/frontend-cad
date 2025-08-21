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
import { Inventory } from '@/entities/Inventory.entity';
import { DEBUG } from '@/conf/envs';
import { InventoryType } from '@/entities/InventoryType.entity';

export const toDay = () => Date.now() ? new Date(Date.now()) : new Date();

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

export function formatToDDMMYYYY(externalDateInput: string | undefined | unknown): string {
  const dateInput = typeof externalDateInput === 'string' ? externalDateInput : undefined;
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatToFullDateHour(externalDateInput: string | undefined | unknown): string {
  const dateInput = typeof externalDateInput === 'string' ? externalDateInput : undefined;
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function formatNumberWithGr(externalValue: number | null | string | unknown) {
  const value = typeof externalValue === 'string' ? parseFloat(externalValue) : externalValue;
  if (typeof value !== 'number' || isNaN(value)) return '';
  const formattedNumber = value.toLocaleString('es-ES');
  return `${formattedNumber} gr`;
}

export const formatCurrency = (externalValue: number | null | string | unknown) => {
  const value = typeof externalValue === 'string' ? parseFloat(externalValue) : externalValue;
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
  externalId: string | number | unknown,
  options: Option[] = []
): string => {
  const id = typeof externalId === 'string' ? parseInt(externalId, 10) : `${externalId
    }`;
  const idStr = id.toString();
  const found = options.find((opt) => opt.value === idStr);
  return found?.label ?? idStr;
};

export function preciseSum(numbers: number[]): number {
  if (numbers.length === 0) return 0;

  const decimalCounts = numbers.map((n) => {
    const [, decimals] = n.toString().split('.');
    return decimals ? decimals.length : 0;
  });

  const maxDecimals = decimalCounts.length > 0 ? Math.max(...decimalCounts) : 0;
  const multiplier = BigInt('1' + '0'.repeat(maxDecimals));

  const total = numbers.reduce((acc, n) => {
    const [integerPart, decimalPart = ''] = n.toString().split('.');
    const scaledString = integerPart + decimalPart.padEnd(maxDecimals, '0');

    const scaled = BigInt(scaledString);
    return acc + scaled;
  }, BigInt(0));

  return Number(total) / Number(multiplier);
}

export const pluralize = (value: number, singular: string, plural: string) => {
  const sufix = value === 1 ? singular : plural;
  return `${value} ${sufix}`;
};

export function sortCustom<T>(
  items: T[],
  orderList: string[],
  key: (item: T) => string
): T[] {
  return [...items].sort((a, b) => {
    const aKey = key(a);
    const bKey = key(b);

    const aIndex = orderList.indexOf(aKey);
    const bIndex = orderList.indexOf(bKey);

    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  });
}

export const filterInventoryType = (data: InventoryType[], inventory: string[]) => {
  return data.filter((item) => inventory.includes(item.label));
};
/**
 * Toma todo el enventario para distribucion
 * de inventario y retorna un set en especifico
 * @param data 
 * @param inventory 
 * @returns 
 */
export const filterByInventory = (data: Inventory[], inventory: string[]) => {
  return data.filter((item) => inventory.includes(item.inventoryType.label));
};

/**
 * Esta funcion calcula la suma total de cantidad y peso de un inventario.
 * @param newData
 * @returns 
 */
export const outputInventorySum = (newData: Inventory[]) => {
  const totalQuantity = preciseSum(newData.map((item) => item.quantity));
  const totalWeight = preciseSum(newData.map((item) => item.weight));

  return { quantity: totalQuantity, weight: totalWeight };
};

export enum LogType {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FETCH = 'fetch',
}

export const typeLog = (type: LogType = LogType.INFO, ...args: unknown[]) => {
  let message = args.join(' ');
  if (type === LogType.FETCH && args[0]) {
    const url = (args[0] as URL);
    message = `${url.pathname}${url.search ? url.search : ''}`;
  }
  log(`[${type}]`, message);
}

/**
 * Función para registrar mensajes en la consola y en un div específico.
 */
const maxMessageLength = 100; // Limitar a 100 caracteres
const maxLines = 5; // Limitar a 5 líneas
const logDiv = document.getElementById('__LOG__');
const deleteOldLogs = () => {
  if (logDiv) {
    const logEntries = logDiv.getElementsByTagName('div');
    while (logEntries.length > maxLines) {
      logDiv.removeChild(logEntries[0]);
    }
  }
};
export const log = (...args: unknown[]) => {
  const timestamp = new Date().toISOString();
  if (DEBUG) {
    console.log(...args);
    if (logDiv) {
      deleteOldLogs();
      const message = args.map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' ');
      const logEntry = document.createElement('div');
      logEntry.textContent = `[${timestamp}] ${message.substring(0, maxMessageLength)}`; // Limitar a 100 caracteres
      logDiv.appendChild(logEntry);
    }
  }
};
