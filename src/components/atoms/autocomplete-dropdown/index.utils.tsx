import { AutocompleteRenderInputParams, TextField } from '@mui/material';
import { Item } from '@/entities/Item.entity';

export const handleAutocompleteChange = (
  event: React.SyntheticEvent<Element, Event>,
  newValue: string,
  onChange: (event: React.SyntheticEvent<Element, Event>, value: string) => void
) => {
  onChange(event, newValue);
};

export const renderInputHandler =
  (label: string) => (params: AutocompleteRenderInputParams) =>
    <TextField {...params} label={label} />;

export const createItem = (
  value: string | number | Item | null | undefined
): Item => {
  if (value === null || value === undefined) {
    return { label: '', value: '' };
  }
  if (typeof value === 'string') {
    return { label: value, value };
  }
  if (typeof value === 'number') {
    return { label: value.toString(), value: value.toString() };
  }
  return { label: value.label, value: value.value };
};
