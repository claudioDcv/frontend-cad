import { Option, toDay, defaultStartDate } from '@/utils';
import { emptyOption, FIRST_PAGE } from '@/constants';
import {
  PackingListFormModel,
  ResolutionFormModel,
} from './types';
import { ContractFormModel } from '@/clients/get-all-contracts/types';
export const addOptionAll = (
  options: Option[],
  allOption: Option = emptyOption
) => [allOption, ...options];

export const isEmpty = (data?: unknown[]) => !data || data.length === 0;

export const defaultResolutionsFormValues: ResolutionFormModel = {
  page: FIRST_PAGE,
  categoryId: emptyOption,
  status: emptyOption,
  investment: emptyOption,
  location: emptyOption,
  range: [defaultStartDate, toDay],
  resolutionNumber: '',
};

export const defaultPackingListFormValues: PackingListFormModel = {
  page: FIRST_PAGE,
  categoryId: emptyOption,
  status: emptyOption,
  investment: emptyOption,
  location: emptyOption,
  range: [defaultStartDate, toDay],
  docNumber: '',
};

export const defaultContractsFormValues: ContractFormModel = {
  resolutionId: '',
  clientRut: '',
  responsible: '',
  expirationBefore: toDay,
  contractNumber: '',
};
