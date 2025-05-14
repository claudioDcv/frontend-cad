import { screen, render, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Dropdown from './index';
import userEvent from '@testing-library/user-event';

const options = [
  { label: 'Oro', value: 'gold' },
  { label: 'Plata', value: 'silver' },
];

describe('Dropdown component', () => {
  test('should render with options', () => {
    render(
      <Dropdown
        label="Seleccionar Opcion"
        options={options}
        onChange={() => undefined}
        value={{ label: '', value: '' }}
      />
    );

    const input = screen.getByRole('combobox', { name: 'Seleccionar Opcion' });
    expect(input).toBeInTheDocument();
  });

  test('should handle empty options list', () => {
    render(
      <Dropdown
        label="Seleccionar Opcion"
        options={[]}
        onChange={() => undefined}
        value={{ label: '', value: '' }}
      />
    );

    const input = screen.getByRole('combobox', { name: 'Seleccionar Opcion' });
    userEvent.click(input);

    const noOptionsMessage = screen.queryByText('No options available');
    expect(noOptionsMessage).not.toBeInTheDocument();
  });

  test('should call onChange when an option is selected', async () => {
    const handleChange = vi.fn();

    render(
      <Dropdown
        label="Seleccionar Opcion"
        options={options}
        onChange={handleChange}
        value={{ label: '', value: '' }}
      />
    );

    const input = screen.getByRole('combobox', { name: 'Seleccionar Opcion' });
    userEvent.click(input);

    const option = await screen.findByText('Oro');
    userEvent.click(option);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith('gold'); 
    });
  });
});
