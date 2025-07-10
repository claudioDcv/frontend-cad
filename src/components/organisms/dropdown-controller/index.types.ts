import { Control, ControllerRenderProps } from 'react-hook-form';
import { SxProps } from '@mui/material';
import { Option } from '@/entities/Option.entity';

export interface DropdownControllerProps {
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
