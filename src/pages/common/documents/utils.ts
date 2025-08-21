import { toDay, defaultStartDate } from '@/utils';
import { emptyOption, FIRST_PAGE } from '@/constants';
import { Option } from '@/entities/Option.entity';
import {
  NotificationFormModel,
  PackingListFormModel,
  ResolutionFormModel,
} from './types';

export const addOptionAll = (
  options: Option[] | undefined,
  allOption: Option = emptyOption
) => [allOption, ...(options || [])];

export const isEmpty = (data?: unknown[]) => !data || data.length === 0;

export const defaultResolutionsFormValues = (): ResolutionFormModel => ({
  page: FIRST_PAGE,
  categoryId: emptyOption,
  status: emptyOption,
  investment: emptyOption,
  location: emptyOption,
  range: [defaultStartDate, toDay()],
  resolutionNumber: '',
});

export const defaultPackingListFormValues = (): PackingListFormModel => ({
  page: FIRST_PAGE,
  categoryId: emptyOption,
  status: emptyOption,
  investment: emptyOption,
  location: emptyOption,
  range: [defaultStartDate, toDay()],
  docNumber: '',
});

export const defaultNotificationFormValues: NotificationFormModel = {
  page: FIRST_PAGE,
};
