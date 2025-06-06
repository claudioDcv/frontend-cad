import { emptyOption } from '../../utils';
import { PackingListFormModel } from './types';
import { Option } from '../../types';

export const defaultPackingListFormValues: PackingListFormModel = {
  status: emptyOption,
};

export const addOptionAll = (
  options: Option[],
  allOption: Option = emptyOption
) => [allOption, ...options];

export const isEmpty = (data?: unknown[]) => !data || data.length === 0;
