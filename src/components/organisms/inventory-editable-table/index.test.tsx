import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, Mock } from 'vitest';
import InventoryEditableTable from './index';
import { useInitialData } from '@/contexts/initial-data/useInitialData';
import {
  initializeData,
  updateResolutionInventory,
  handleInventoryChange,
} from './index.utils';
import { filterByInventory } from '@/utils';
import { allowedInventories } from '@/constants';
import { Inventory } from '@/entities/Inventory.entity';
import { EditableTableProps } from './index.types';
import { InventoryType } from '@/entities/InventoryType.entity';
import { InventoryResolution } from '@/entities/InventoryResolution.entity';

// Mocks de utilidades y hooks
vi.mock('@/contexts/initial-data/useInitialData', () => ({
  useInitialData: vi.fn(),
}));

vi.mock('./index.utils', () => ({
  initializeData: vi.fn(),
  updateResolutionInventory: vi.fn(),
  handleInventoryChange: vi.fn(),
}));

vi.mock('@/utils', () => ({
  filterByInventory: vi.fn(),
  outputInventorySum: vi.fn(() => ({ quantity: 0, weight: 0 })),
  pluralize: vi.fn((value, singular) => `${value} ${singular}`),
}));

vi.mock('@/constants', () => ({
  allowedInventories: ['refaction', 'common', 'bad'],
  inventoryCategories: {
    refaction: 'refaction',
    common: 'common',
    bad: 'bad',
  },
}));

vi.mock('./components/table-body', () => ({
  default: ({
    data,
    onChange,
  }: {
    data: Inventory[];
    onChange: (
      inventoryType: InventoryType,
      key: 'quantity' | 'weight',
      value: string
    ) => void;
  }) => {
    return (
      <>
        {data.map((item) => (
          <tr key={String(item.inventoryType)}>
            <td>
              <input
                data-testid={`input-${item.inventoryType}`}
                value={item.quantity}
                onChange={(e) =>
                  onChange(item.inventoryType, 'quantity', e.target.value)
                }
              />
            </td>
          </tr>
        ))}
      </>
    );
  },
}));

describe('InventoryEditableTable', () => {
  const mockSetData = vi.fn();
  const mockOnChange = vi.fn();
  const mockProps: EditableTableProps = {
    data: [],
    setData: mockSetData,
    resolutionInventory: [],
    onChange: mockOnChange,
    total: { quantity: 0, weight: 0 },
  };

  const mockInventoryTypes = [
    {
      inventoryType: 'refaction' as unknown as InventoryType,
      inventoryCategory: 'refaction',
    },
    {
      inventoryType: 'common' as unknown as InventoryType,
      inventoryCategory: 'common',
    },
    {
      inventoryType: 'bad' as unknown as InventoryType,
      inventoryCategory: 'bad',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (useInitialData as Mock).mockReturnValue({
      inventoryTypes: mockInventoryTypes,
    });
    (initializeData as Mock).mockReturnValue([]);
    (updateResolutionInventory as Mock).mockReturnValue([]);
    (handleInventoryChange as Mock).mockReturnValue([]);

    // Configurar el mock de filterByInventory para cada prueba
    (filterByInventory as Mock).mockImplementation((data, category) => {
      const inventoryTypesByCategory = mockInventoryTypes
        .filter((type) => type.inventoryCategory === category)
        .map((type) => type.inventoryType);
      return (data as Inventory[]).filter((item) =>
        inventoryTypesByCategory.includes(item.inventoryType)
      );
    });
  });

  test('should render the table and initial content', () => {
    render(<InventoryEditableTable {...mockProps} />);

    expect(screen.getByText('Inventario editable')).toBeInTheDocument();
    expect(
      screen.getByText('Para editar un número haz click sobre él')
    ).toBeInTheDocument();
    expect(screen.getByText('Inventario')).toBeInTheDocument();
    expect(screen.getByText('Cantidad')).toBeInTheDocument();
    expect(screen.getByText('Peso Neto (gr)')).toBeInTheDocument();
  });

  test('should call initializeData and setData on first render', () => {
    const mockInitializedData: Inventory[] = [
      {
        inventoryType: 'newType' as unknown as InventoryType,
        quantity: 1,
        weight: 1,
      },
    ];
    (initializeData as Mock).mockReturnValue(mockInitializedData);

    render(<InventoryEditableTable {...mockProps} />);

    expect(initializeData).toHaveBeenCalledWith(
      mockProps.data,
      mockInventoryTypes,
      allowedInventories
    );
    expect(mockSetData).toHaveBeenCalledWith(mockInitializedData);
  });

  test('should call updateResolutionInventory when resolutionInventory is available', async () => {
    const mockResData: Inventory[] = [
      {
        inventoryType: 'type1' as unknown as InventoryType,
        quantity: 10,
        weight: 100,
      },
    ];
    (updateResolutionInventory as Mock).mockReturnValue(mockResData);

    const initialData: Inventory[] = [
      {
        inventoryType: 'type1' as unknown as InventoryType,
        quantity: 5,
        weight: 50,
      },
    ];
    const resolutionData: InventoryResolution[] = [
      {
        inventoryTypeId: 1,
        quantity: 10,
        weight: 100,
        id: 1,
        resolutionId: 1,
        totalWeight: 100,
        createdBy: 0,
        updatedBy: 0,
      },
    ];

    render(
      <InventoryEditableTable
        {...mockProps}
        data={initialData}
        resolutionInventory={resolutionData}
      />
    );

    expect(updateResolutionInventory).toHaveBeenCalledWith(
      initialData,
      resolutionData
    );
    expect(mockSetData).toHaveBeenCalledWith(mockResData);
  });

  test('should not call updateResolutionInventory on subsequent renders after initialization', async () => {
    const initialData: Inventory[] = [
      {
        inventoryType: 'type1' as unknown as InventoryType,
        quantity: 5,
        weight: 50,
      },
    ];
    const resolutionData: InventoryResolution[] = [
      {
        inventoryTypeId: 1,
        quantity: 10,
        weight: 100,
        id: 1,
        resolutionId: 1,
        totalWeight: 100,
        createdBy: 0,
        updatedBy: 0,
      },
    ];

    const { rerender } = render(
      <InventoryEditableTable
        {...mockProps}
        data={initialData}
        resolutionInventory={resolutionData}
      />
    );

    (updateResolutionInventory as Mock).mockClear();

    rerender(
      <InventoryEditableTable
        {...mockProps}
        data={initialData}
        resolutionInventory={resolutionData}
      />
    );

    expect(updateResolutionInventory).not.toHaveBeenCalled();
  });

  test('should handle inventory change and update state', () => {
    const mockInitialData: Inventory[] = [
      {
        inventoryType: 'refaction' as unknown as InventoryType,
        quantity: 10,
        weight: 100,
      },
      {
        inventoryType: 'common' as unknown as InventoryType,
        quantity: 5,
        weight: 50,
      },
      {
        inventoryType: 'bad' as unknown as InventoryType,
        quantity: 2,
        weight: 20,
      },
    ];
    const mockNewData: Inventory[] = [
      {
        inventoryType: 'refaction' as unknown as InventoryType,
        quantity: 15,
        weight: 100,
      },
    ];

    (handleInventoryChange as Mock).mockReturnValue(mockNewData);

    render(<InventoryEditableTable {...mockProps} data={mockInitialData} />);

    const inputElement = screen.getByTestId('input-refaction');
    act(() => {
      fireEvent.change(inputElement, { target: { value: '15' } });
    });

    expect(handleInventoryChange).toHaveBeenCalledWith(
      mockInitialData,
      'refaction',
      'quantity',
      '15',
      mockOnChange
    );
    expect(mockSetData).toHaveBeenCalledWith(mockNewData);
  });
});
