import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useForm } from 'react-hook-form';
import DropdownController from './index';
import { Option } from '@/entities/Option.entity';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('../../molecules/dropdown', () => ({
  default: ({
    label,
    options,
    disabled,
  }: {
    label: string;
    options: Option[];
    disabled?: boolean;
  }) => (
    <div>
      <label>{label}</label>
      <select disabled={disabled} data-testid="dropdown">
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  ),
}));

describe('DropdownController', () => {
  test('renders correctly with options and label', () => {
    const Wrapper = () => {
      const { control } = useForm();
      const options: Option[] = [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
      ];

      return (
        <DropdownController
          name="myDropdown"
          control={control}
          label="label.test"
          options={options}
          onChange={(field) => (option) => field.onChange(option)}
          disabled={false}
        />
      );
    };

    render(<Wrapper />);

    expect(screen.getByText('label.test')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });
});
