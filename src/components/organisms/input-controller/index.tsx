import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';

import { Option } from '../../../types';

import Dropdown from '../../molecules/dropdown';

interface InputControllerProps {
  control: any;
  onChange: (field: any) => (opt: Option) => void;
  options: Option[];
  disabled: boolean;
  name: string;
  label: string;
}

const InputController = (props: InputControllerProps) => {
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

export default InputController;
