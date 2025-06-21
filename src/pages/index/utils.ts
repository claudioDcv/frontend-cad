import { defaultStartDate, emptyOption, FIRST_PAGE } from '../../utils';
import { Option } from '../../types';
import { PropsContract } from '../../clients/get-all-contracts/types';
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
};

export const defaultPackingListFormValues: PackingListFormModel = {
  page: FIRST_PAGE,
  categoryId: emptyOption,
  status: emptyOption,
  investment: emptyOption,
  location: emptyOption,
  range: [toDay, toDay],
  docNumber: ''
};

export const defaultContractsFormValues: ContractFormModel = {
  resolutionId: emptyOption,
  clientRut: '',
  responsible: '',
  expirationBefore: toDay,
  contractId: emptyOption,
};

export function contractParams(
  page: number,
  filters: {
    resolutionId?: { value: string };
    clientRut?: string;
    responsible?: string;
    expirationBefore?: Date;
    contractId?: { value: string };
  }
): PropsContract {
  const { resolutionId, clientRut, responsible, expirationBefore, contractId } =
    filters;

  const params: PropsContract = {
    page,
    resolutionId: resolutionId?.value,
    clientRut: clientRut || undefined,
    responsible,
    expirationBefore: expirationBefore?.toISOString().split('T')[0],
    contractId: contractId?.value,
  };

  return params;
}
