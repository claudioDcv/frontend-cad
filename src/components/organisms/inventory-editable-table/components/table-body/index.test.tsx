import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import TableBody from './index';
import { InventoryValue } from '@/entities/Inventory.entity';

vi.mock('../editable-row', () => {
  return {
    default: vi.fn(({ value, onChange }) => (
      <input
        data-testid="editable-row"
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )),
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => `translated: ${key}`,
  }),
}));

describe('TableBody', () => {
  const mockData = [
    {
      inventoryType: { value: 'typeA', label: 'labelA' },
      quantity: 10,
      weight: 20.5,
    },
    {
      inventoryType: { value: 'typeB', label: 'labelB' },
      quantity: 5,
      weight: 15.3,
    },
  ];

  test('renders a table with the correct number of rows', () => {
    const mockOnChange = vi.fn();
    render(<TableBody data={mockData} onChange={mockOnChange} />);

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(mockData.length);
  });

  test('renders translated inventory types', () => {
    const mockOnChange = vi.fn();
    render(<TableBody data={mockData} onChange={mockOnChange} />);

    expect(
      screen.getByText('translated: inventoryType.labelA')
    ).toBeInTheDocument();
    expect(
      screen.getByText('translated: inventoryType.labelB')
    ).toBeInTheDocument();
  });

  test('renders EditableRow components with correct initial values', () => {
    const mockOnChange = vi.fn();
    render(<TableBody data={mockData} onChange={mockOnChange} />);

    const editableRows = screen.getAllByTestId(
      'editable-row'
    ) as HTMLInputElement[];
    expect(editableRows).toHaveLength(4);

    expect(editableRows[0].defaultValue).toBe('10');
    expect(editableRows[1].defaultValue).toBe('20.5');
    expect(editableRows[2].defaultValue).toBe('5');
    expect(editableRows[3].defaultValue).toBe('15.3');
  });

  test('calls onChange with correct parameters when a quantity is changed', () => {
    const mockOnChange = vi.fn();
    render(<TableBody data={mockData} onChange={mockOnChange} />);

    const editableRows = screen.getAllByTestId(
      'editable-row'
    ) as HTMLInputElement[];
    const firstQuantityInput = editableRows[0];

    fireEvent.change(firstQuantityInput, { target: { value: '100' } });

    expect(mockOnChange).toHaveBeenCalledWith(
      mockData[0].inventoryType,
      InventoryValue.Quantity,
      '100'
    );
  });

  test('calls onChange with correct parameters when a weight is changed', () => {
    const mockOnChange = vi.fn();
    render(<TableBody data={mockData} onChange={mockOnChange} />);

    const editableRows = screen.getAllByTestId(
      'editable-row'
    ) as HTMLInputElement[];
    const firstWeightInput = editableRows[1];

    fireEvent.change(firstWeightInput, { target: { value: '50.1' } });

    expect(mockOnChange).toHaveBeenCalledWith(
      mockData[0].inventoryType,
      InventoryValue.Weight,
      '50.1'
    );
  });
});
