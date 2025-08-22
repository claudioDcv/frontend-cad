import { Material } from '@/components/molecules/material-type/types';

export const statusToKeyMap: Record<
  number, {
    icon: string;
    label: string;
    color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  }
> = {
  13: { icon: 'reserved', label: 'Reserved', color: 'default' },
  19: { icon: 'accepted-payment', label: 'AcceptedPayment', color: 'default' },
  22: { icon: 'deleted', label: 'Deleted', color: 'error' },
  26: { icon: 'closed', label: 'Closed', color: 'success' },
  29: { icon: 'accepted', label: 'Accepted', color: 'default' },
  30: { icon: 'rejected', label: 'RejectedPayment', color: 'error' },
  66: { icon: 'sent', label: 'Sent', color: 'default' },
  67: { icon: 'truck-doc-received', label: 'TruckDocReceived', color: 'default' },
  68: { icon: 'contract-reviewed', label: 'ContractReviewed', color: 'default' },
  69: { icon: 'rejected', label: 'RejectedPayment', color: 'error' },
  70: { icon: 'closed', label: 'Closed', color: 'default' },
  81: { icon: 'income-movement', label: 'IncomeMovement', color: 'default' },
  86: { icon: 'contract-not-saved', label: 'ContractNotSaved', color: 'error' },
  89: { icon: 'expenditure', label: 'Expenditure', color: 'default' },
  90: { icon: 'income', label: 'Income', color: 'default' },
  91: { icon: 'rejected', label: 'RejectedPayment', color: 'error' },
  92: { icon: 'not-pending', label: 'NotPendingPayment', color: 'warning' },
  20: { icon: 'pre-resolved', label: 'PreResolved', color: 'info' },
  11: { icon: 'resolved', label: 'Resolved', color: 'info' },
  /* Estados no conocidos */
  2: { icon: 'default', label: 'Default', color: 'default' }
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

export const STATUS_PRE_RESOLUTION = 20;

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
export const emptyTotal = { quantity: 0, weight: 0 };

export const materialMap: Record<string, Material> = {
  '1': 'Gold',
  '2': 'Silver',
  '3': 'Platinum',
  '4': 'ExclusiveBrand',
  '5': 'Steel',
  '6': 'Accessory',
};

export const validRoles = {
  operator: 'operator-role',
  admin: 'admin-role',
  cordinator: 'cordinator-role',
};

export const commonNotificationTypes = ['resolution_notification'];

/* DISTRIBUCION DE INVENTARIOS */
const refactionInventories = [
  'anillo',
  'aro',
  'colgante',
  'cadena',
  'pulcera',
]

const commonInventories = [
  'joyaespecial',
  'moneda',
  'lingote',
  'relojneto',
  'scrap',
]

const badInventories = [
  'materialfalso',
  'materialfaltante',
  'materialbajaley',
]

export const inventoryCategories = {
  refaction: refactionInventories,
  common: commonInventories,
  bad: badInventories,
};

export const allowedInventories = [
  ...inventoryCategories.refaction,
  ...inventoryCategories.common,
  ...inventoryCategories.bad,
];
