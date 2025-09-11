import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SxProps, Theme } from '@mui/material';
import { Option } from '@/entities/Option.entity';
import tsStyles from './index.styles';
import Dropdown from '../../molecules/dropdown';

export interface DropdownControllerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (field: ControllerRenderProps<any, any>) => (opt: Option) => void;
  options: Option[];
  disabled: boolean;
  name: string;
  label: string;
  sx?: SxProps<Theme>;
}

const DropdownController = (props: DropdownControllerProps) => {
  const { t } = useTranslation();
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <Dropdown
          {...field}
          value={field.value || ''} // Ensure the initial value is valid
          onChange={props.onChange ? props.onChange(field) : field.onChange}
          options={props.options}
          label={t(props.label)}
          disabled={props.disabled}
          sx={tsStyles.getDropdownStyles(props.sx)}
        />
      )}
    />
  );
};

export default DropdownController;
