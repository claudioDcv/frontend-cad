import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useId } from "react";

type Item = {
  value: string;
  label: string;
};

export interface DropdownProps {
  value?: Item;
  onChange: (value: Item) => void;
  options: Item[];
  label: string;
  required?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  label,
  required,
}) => {
  const id = useId();

  const handleChange = (event: SelectChangeEvent) => {
    const selected = options.find(opt => opt.value === event.target.value);
    if (selected) onChange(selected);
  };

  return (
    <FormControl fullWidth size="small" variant="outlined" required={required}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={`select-${id}`}
        value={value?.value || ''}
        label={label}
        onChange={handleChange}
        displayEmpty
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
