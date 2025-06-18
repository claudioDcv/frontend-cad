import { PackingListFilters, PropsPackingList } from '../../../../clients/get-all-packing-list/types';
import { emptyOption, toDay } from '../../../../utils';
import { PackingListFormModel } from '../../types';

export function packingListParams(
  page: number,
  filters: PackingListFilters
): PropsPackingList {
  const { status, materialType, range, investment, location } = filters;

  const params: PropsPackingList = {
    page,
    statusId: status?.value,
    categoryId: materialType?.value,
    investmentId: investment?.value,
    originLocationId: location?.value,
    endDate: range[1].toISOString().split('.')[0],
  };

  if (range[0].toDateString() !== range[1].toDateString()) {
    params.startDate = range[0].toISOString().split('.')[0];
  }

  return params;
}

export const defaultPackingListFormValues: PackingListFormModel = {
  materialType: emptyOption,
  status: emptyOption,
  investment: emptyOption,
  location: emptyOption,
  range: [toDay, toDay],
};
