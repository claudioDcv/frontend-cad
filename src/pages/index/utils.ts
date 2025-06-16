import { emptyOption } from '../../utils';
import { Option } from '../../types';
import { PropsContract } from '../../clients/get-all-contracts/types';
import { PropsResolution } from '../../clients/get-all-resolutions/types';
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

export function resolutionParams(
  page: number,
  filters: {
    investment?: { value: string };
    location?: { value: string };
    materialType?: { value: string };
    status?: { value: string };
    range: [Date, Date];
  }
): PropsResolution {
  const { investment, location, materialType, status, range } = filters;

  const params: PropsResolution = {
    page,
    investmentId: investment?.value,
    locationId: location?.value,
    categoryId: materialType?.value,
    stateId: status?.value,
    endDate: range[1].toISOString().split('.')[0],
  };

  if (range[0].toDateString() !== range[1].toDateString()) {
    params.startDate = range[0].toISOString().split('.')[0];
  }

  return params;
}

export const defaultResolutionsFormValues: ResolutionFormModel = {
  materialType: emptyOption,
  status: emptyOption,
  investment: emptyOption,
  location: emptyOption,
  range: [toDay, toDay],
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

export const defaultContractsFormValues: ContractFormModel = {
  resolutionId: emptyOption,
  clientRut: '',
  responsible: '',
  expirationBefore: toDay,
  contractId: emptyOption,
};

export const defaultPackingListFormValues: PackingListFormModel = {
  status: emptyOption,
};
