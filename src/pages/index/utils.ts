import { defaultStartDate, emptyOption, FIRST_PAGE } from '../../utils';
import { Option } from '../../types';
import { toDay } from '../../utils';
import {
  ContractFormModel,
  PackingListFormModel,
  ResolutionFormModel,
} from './types';

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
  resolutionNumber: ''
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
  page: FIRST_PAGE,
  resolutionId: '',
  clientRut: '',
  responsible: '',
  expirationBefore: toDay,
  contractNumber: '',
};