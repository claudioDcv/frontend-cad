import { Autocomplete, FormControl } from '@mui/material';
import { useId } from 'react';
import { handleAutocompleteChange, renderInputHandler } from './index.utils';

type Item = {
  value: string;
  label: string;
}

export interface AutocompleteDropdownProps {
  value?: Item;
  label: string;
  options: Item[];
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => void;
  disableClearable?: boolean;
}

const AutocompleteDropdown: React.FC<AutocompleteDropdownProps> = ({
  options,
  label,
  value,
  onChange,
  disableClearable = false,
}) => {
  const id = useId();
  const selectedOption = options.find((option) => option.value === value?.value);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: Item | null
  ) => {
    handleAutocompleteChange(event, newValue?.value ?? '', onChange);
  };

  const getOptionLabel = (option: Item) => option.label;
  const isOptionEqualToValue = (option: Item, value: Item) => option.value === value.value;
  const renderInput = renderInputHandler(label);

  return (
    <FormControl fullWidth>
      <Autocomplete
        size="small"
        id={`autocomplete-dropdown-${id}`}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        getOptionLabel={getOptionLabel}
        renderInput={renderInput}
        isOptionEqualToValue={isOptionEqualToValue}
        disableClearable={disableClearable}
      />
    </FormControl>
  );
};

export default AutocompleteDropdown;