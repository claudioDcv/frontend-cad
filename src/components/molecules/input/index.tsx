import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  SxProps,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useId } from 'react';

interface InputProps {
  label: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  type?: 'text' | 'number' | 'password' | 'email' | 'search' | 'textarea';
  id?: string;
  placeholder?: string;
  required?: boolean;
  size?: 'small' | 'medium';
  marginTop?: boolean;
  sx?: SxProps;
}

const Input: React.FC<InputProps> = ({
  id: externalId,
  required,
  label,
  value,
  onChange,
  placeholder,
  marginTop,
  icon,
  iconPosition = 'start',
  type = 'text',
  size = 'small',
  sx,
}) => {
  const id = useId();
  const startAdornment =
    type === 'search' ? (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ) : icon && iconPosition === 'start' ? (
      <InputAdornment position="start">{icon}</InputAdornment>
    ) : null;

  const endAdornment =
    icon && iconPosition === 'end' ? (
      <InputAdornment position="end">{icon}</InputAdornment>
    ) : null;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      // convert the value to a number or set it to 0 if NaN
      const valueAsNumber = Number(event.target.value);
      onChange({
        ...event,
        target: {
          ...event.target,
          value: `${isNaN(valueAsNumber) ? 0 : valueAsNumber}`,
        },
      });
    } else {
      onChange(event);
    }
  };

  return (
    <FormControl
      fullWidth
      size={size}
      variant="outlined"
      sx={{ mt: marginTop ? 1 : 0, ...sx }}
    >
      <InputLabel htmlFor={externalId || id} required={required}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={externalId || id}
        type={type}
        label={label}
        value={value}
        onChange={handleOnChange}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        placeholder={placeholder}
        {...(type === 'textarea' ? { multiline: true, minRows: 3 } : {})}
      />
    </FormControl>
  );
};

export default Input;
