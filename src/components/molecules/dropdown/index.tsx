import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  SxProps,
} from '@mui/material';
import { useId } from 'react';
import { Option } from '@/utils';

export interface DropdownProps {
  value?: Option;
  onChange: (value: Option) => void;
  options: Option[];
  label: string;
  required?: boolean;
  disabled?: boolean;
  sx?: SxProps;
}

const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  label,
  required,
  disabled = false,
  sx
}) => {
  const id = useId();

  const handleChange = (event: SelectChangeEvent) => {
    const selected = options.find((opt) => opt.value === event.target.value);
    if (selected) onChange(selected);
  };

  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      required={required}
      disabled={disabled}
      sx={sx}
    >
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={`select-${id}`}
        value={value?.value}
        label={label}
        onChange={handleChange}
        disabled={disabled}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
