import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import AutocompleteDropdown from './index';

describe('AutocompleteDropdown', () => {
  const options = [
    { label: 'Oro', value: 'gold' },
    { label: 'Plata', value: 'silver' }
  ];

  test('should render the Autocomplete component with label', () => {
    render(
      <AutocompleteDropdown
        label='Seleccionar Opcion'
        options={options}
        value={undefined}
        onChange={() => undefined}
      />
    );

    const input = screen.getByRole('combobox', { name: 'Seleccionar Opcion' });
    expect(input).toBeInTheDocument();
  });

  test('should display options when clicked', async () => {
    render(
      <AutocompleteDropdown
        label='Seleccionar Opcion'
        options={options}
        value={undefined}
        onChange={() => undefined}
      />
    );

    const input = screen.getByRole('combobox', { name: 'Seleccionar Opcion' });

    await userEvent.click(input);

    await waitFor(() => {
      expect(screen.getByText('Oro')).toBeInTheDocument();
      expect(screen.getByText('Plata')).toBeInTheDocument();
    });
  });

  test('should select an option and call onChange with the correct value', async () => {
    const handleChange = vi.fn();

    render(
      <AutocompleteDropdown
        label='Seleccionar Opcion'
        options={options}
        value={undefined}
        onChange={handleChange}
      />
    );

    const input = screen.getByRole('combobox', { name: 'Seleccionar Opcion' });

    await userEvent.click(input);
    const option = await screen.findByText('Oro');
    await userEvent.click(option);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 'gold');
    });
  });

  test('should not display clearable option when disableClearable is true', () => {
    render(
      <AutocompleteDropdown
        label='Seleccionar Opcion'
        options={options}
        value={{ label: 'Oro', value: 'gold' }}
        onChange={() => undefined}
        disableClearable={true}
      />
    );

    const clearButton = screen.queryByRole('button', { name: /clear/i });
    expect(clearButton).not.toBeInTheDocument();
  });

  test('should display the selected option', () => {
    render(
      <AutocompleteDropdown
        label='Seleccionar Opcion'
        options={options}
        value={{ label: 'Oro', value: 'gold' }}
        onChange={() => undefined}
      />
    );

    const input = screen.getByRole('combobox', { name: 'Seleccionar Opcion' });
    expect(input).toHaveValue('Oro');
  });
});