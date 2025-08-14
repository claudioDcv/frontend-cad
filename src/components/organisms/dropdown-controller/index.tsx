import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Dropdown from '../../molecules/dropdown';
import { DropdownControllerProps } from './index.types';

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
          sx={{ maxWidth: 250, ...props.sx }}
        />
      )}
    />
  );
};

export default DropdownController;
