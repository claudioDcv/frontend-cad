import { useTranslation } from 'react-i18next';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import { Option } from '@/utils';
import Dropdown from '../../molecules/dropdown';

interface DropdownControllerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (field: ControllerRenderProps<any, any>) => (opt: Option) => void;
  options: Option[];
  disabled: boolean;
  name: string;
  label: string;
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
        />
      )}
    />
  );
};

export default DropdownController;
