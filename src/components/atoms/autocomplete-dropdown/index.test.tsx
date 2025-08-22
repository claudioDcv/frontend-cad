import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import AutocompleteDropdown from './index';

describe('AutocompleteDropdown', () => {
  const options = [
    { label: 'Oro', value: 'gold' },
    { label: 'Plata', value: 'silver' },
  ];

  test('renders the Autocomplete component with label', () => {
    render(
      <AutocompleteDropdown
        label="Seleccionar Opcion"
        options={options}
        value={undefined}
        onChange={() => {}}
      />
    );

    const input = screen.getByRole('combobox', { name: 'Seleccionar Opcion' });
    expect(input).toBeInTheDocument();
  });

  test('displays options when clicked', async () => {
    render(
      <AutocompleteDropdown
        label="Seleccionar Opcion"
        options={options}
        value={undefined}
        onChange={() => {}}
      />
    );

    const input = screen.getByRole('combobox', { name: 'Seleccionar Opcion' });
    await userEvent.click(input);

    await waitFor(() => {
      expect(screen.getByText('Oro')).toBeInTheDocument();
      expect(screen.getByText('Plata')).toBeInTheDocument();
    });
  });

  test('selects an option and calls onChange with the correct value', async () => {
    const handleChange = vi.fn();

    render(
      <AutocompleteDropdown
        label="Seleccionar Opcion"
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

  test('does not display clear button when disableClearable is true', () => {
    render(
      <AutocompleteDropdown
        label="Seleccionar Opcion"
        options={options}
        value={{ label: 'Oro', value: 'gold' }}
        onChange={() => {}}
        disableClearable={true}
      />
    );

    const clearButton = screen.queryByRole('button', { name: /clear/i });
    expect(clearButton).not.toBeInTheDocument();
  });

  test('displays the selected option', () => {
    render(
      <AutocompleteDropdown
        label="Seleccionar Opcion"
        options={options}
        value={{ label: 'Oro', value: 'gold' }}
        onChange={() => {}}
      />
    );

    const input = screen.getByRole('combobox', { name: 'Seleccionar Opcion' });
    expect(input).toHaveValue('Oro');
  });

  test('calls handleAutocompleteChange indirectly when option is selected', async () => {
    const handleChange = vi.fn();

    render(
      <AutocompleteDropdown
        label="Seleccionar Opcion"
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

  test('calls handleAutocompleteChange with empty string when newValue is null', async () => {
    const handleChange = vi.fn();

    render(
      <AutocompleteDropdown
        label="Seleccionar Opcion"
        options={options}
        value={{ label: 'Oro', value: 'gold' }}
        onChange={handleChange}
      />
    );

    const input = screen.getByRole('combobox', { name: 'Seleccionar Opcion' });
    await userEvent.click(input);

    await userEvent.keyboard('{Backspace}');

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), '');
    });
  });
});
