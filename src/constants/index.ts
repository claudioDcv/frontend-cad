import { Material } from '@/components/molecules/material-type/types';
import Token from '../tokens';

export const statusToKeyMap: Record<number, keyof typeof Token.IconTemplate> = {
  19: 'AcceptedPayment',
  26: 'ContractAllSaved',
  29: 'ContractReviewed',
  30: 'RejectedPayment',
  66: 'Sent',
  67: 'TruckDocReceived',
  68: 'ContractReviewed',
  69: 'RejectedPayment',
  70: 'ContractAllSaved',
  81: 'IncomeMovement',
  86: 'ContractNotSaved',
  89: 'Expenditure',
  90: 'Income',
  91: 'RejectedPayment',
  92: 'NotPendingPayment',
};

export enum FetchStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const STATUS_RESOLUTION = 14;
export const STATUS_CONTRACTS = 2;
export const STATUS_PACKING_LIST = 32;

export const TAB_RESOLUTIONS = 0;
export const TAB_PACKING_LIST = 1;

export const FIRST_PAGE_INDEX = 0;
export const FIRST_PAGE = 1;
export const ITEMS_PER_PAGE = 20;

export const FIVE_YEARS_AGO = 5;
export const FIRST_DAY = 1;
export const LAST_DAY_OF_PREVIOUS_MONTH = 0;

export const LOCATION_ACTIVE = true;
export const LOCATION_INACTIVE = false;

export const SEARCH_DELAY = 300;

export const emptyOption = { value: 'all', label: 'TODOS' };

export const materialMap: Record<string, Material> = {
  '1': 'Gold',
  '2': 'Silver',
  '3': 'Platinum',
  '4': 'ExclusiveBrand',
  '5': 'Steel',
  '6': 'Accessory',
};
