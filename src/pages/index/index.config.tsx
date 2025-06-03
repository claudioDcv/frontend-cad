import { emptyOption, toDay } from '../../utils';
import { PackingListFormModel, ResolutionFormModel } from './types';

export const defaultResolutionsFormValues: ResolutionFormModel = {
  materialType: emptyOption,
  status: emptyOption,
  investment: emptyOption,
  location: emptyOption,
  dateRange: [toDay, toDay],
};

export const defaultPackingListFormValues: PackingListFormModel = {
  status: emptyOption,
};