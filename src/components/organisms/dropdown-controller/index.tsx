import { useTranslation } from 'react-i18next';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import { Option } from '@/entities/Option.entity';
import Dropdown from '../../molecules/dropdown';
import { SxProps } from '@mui/material';

interface DropdownControllerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (field: ControllerRenderProps<any, any>) => (opt: Option) => void;
  options: Option[];
  disabled: boolean;
  name: string;
  label: string;
  sx?: SxProps;
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
          onChange={props.onChange(field)}
          options={props.options}
          label={t(props.label)}
          disabled={props.disabled}
          sx={{ maxWidth: 250, ...props.sx }}
        />
      )}
    />
  );
};

export default DropdownController;
