import { describe, test, expect, vi } from 'vitest';
import { Inventory } from '@/entities/Inventory.entity';
import {
  initializeData,
  updateResolutionInventory,
  handleInventoryChange,
} from './index.utils';
import * as utils from '@/utils';
import { InventoryType } from '@/entities/InventoryType.entity';

describe('initializeData', () => {
  test('should return empty array if data exists', () => {
    const data: Inventory[] = [
      { inventoryType: { label: 'A', value: '1' }, quantity: 1, weight: 1 },
    ];
    const result = initializeData(data, [], []);
    expect(result).toEqual(data);
  });

  test('should initialize data if input data is empty and inventoryTypes exist', () => {
    const inventoryTypes: InventoryType[] = [
      { label: 'B', value: '2' },
      { label: 'A', value: '1' },
    ];
    const allowed = ['A', 'B'];

    const result = initializeData([], inventoryTypes, allowed);
    expect(result).toEqual([
      { inventoryType: { label: 'A', value: '1' }, quantity: 0, weight: 0 },
      { inventoryType: { label: 'B', value: '2' }, quantity: 0, weight: 0 },
    ]);
  });

  test('should return empty array if both data and inventoryTypes are empty', () => {
    const result = initializeData([], [], []);
    expect(result).toEqual([]);
  });
});

describe('updateResolutionInventory', () => {
  test('should update quantity and weight if resolutionInventory matches', () => {
    const data: Inventory[] = [
      { inventoryType: { label: 'A', value: '1' }, quantity: 0, weight: 0 },
    ];
    const res = [{ inventoryTypeId: 1, quantity: 5, weight: 10 }];
    const result = updateResolutionInventory(data, res);
    expect(result[0]).toEqual({
      inventoryType: { label: 'A', value: '1' },
      quantity: 5,
      weight: 10,
    });
  });

  test('should leave item unchanged if no match', () => {
    const data: Inventory[] = [
      { inventoryType: { label: 'A', value: '1' }, quantity: 0, weight: 0 },
    ];
    const res = [{ inventoryTypeId: 2, quantity: 5, weight: 10 }];
    const result = updateResolutionInventory(data, res);
    expect(result[0]).toEqual(data[0]);
  });
});

describe('handleInventoryChange', () => {
  test('should update the correct item and call onChange', () => {
    const data: Inventory[] = [
      { inventoryType: { label: 'A', value: '1' }, quantity: 0, weight: 0 },
    ];
    const inventoryType: InventoryType = { label: 'A', value: '1' };
    const onChange = vi.fn();

    vi.spyOn(utils, 'outputInventorySum').mockReturnValue({
      quantity: 5,
      weight: 10,
    });

    const result = handleInventoryChange(
      data,
      inventoryType,
      'quantity',
      '5',
      onChange
    );

    expect(result[0].quantity).toBe(5);
    expect(onChange).toHaveBeenCalledWith({
      quantity: 5,
      weight: 10,
      inventoryTypeId: 1,
    });
  });

  test('should leave other items unchanged', () => {
    const data: Inventory[] = [
      { inventoryType: { label: 'A', value: '1' }, quantity: 0, weight: 0 },
      { inventoryType: { label: 'B', value: '2' }, quantity: 0, weight: 0 },
    ];
    const inventoryType: InventoryType = { label: 'A', value: '1' };

    const result = handleInventoryChange(data, inventoryType, 'quantity', '5');

    expect(result[0].quantity).toBe(5);
    expect(result[1].quantity).toBe(0);
  });

  test('should return original data if value is invalid', () => {
    const data: Inventory[] = [
      { inventoryType: { label: 'A', value: '1' }, quantity: 0, weight: 0 },
    ];
    const inventoryType: InventoryType = { label: 'A', value: '1' };

    const result = handleInventoryChange(data, inventoryType, 'quantity', '-1');
    expect(result).toEqual(data);

    const resultNaN = handleInventoryChange(
      data,
      inventoryType,
      'quantity',
      'abc'
    );
    expect(resultNaN).toEqual(data);
  });
});
