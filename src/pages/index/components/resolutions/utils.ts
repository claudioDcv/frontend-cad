import { emptyOption, FIRST_PAGE, toDay } from '../../../../utils';
import { ResolutionFormModel } from '../../types';

export const defaultResolutionsFormValues: ResolutionFormModel = {
  page: FIRST_PAGE,
  categoryId: emptyOption,
  status: emptyOption,
  investment: emptyOption,
  location: emptyOption,
  range: [toDay, toDay],
};
