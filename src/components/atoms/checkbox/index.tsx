import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';

interface CheckboxProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ value, onChange, label, disabled }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          checked={value}
          onChange={handleChange}
          disabled={disabled}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
