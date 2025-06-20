import {
  PropsResolution,
  ResolutionFilters,
} from '../../../../clients/get-all-resolutions/types';
import { emptyOption, FIRST_PAGE, toDay } from '../../../../utils';
import { ResolutionFormModel } from '../../types';

export function resolutionParams(
  page: number,
  filters: ResolutionFilters
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
  page: FIRST_PAGE,
  categoryId: emptyOption,
  status: emptyOption,
  investment: emptyOption,
  location: emptyOption,
  range: [toDay, toDay],
};
