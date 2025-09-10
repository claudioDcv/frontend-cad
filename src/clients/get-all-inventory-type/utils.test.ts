import { describe, test, expect } from 'vitest';
import { allowedInventories } from '@/constants';
import type { InventoryType } from '@/entities/InventoryType.entity';
import { InventoryTypeResponse } from './types';
import { remap } from './utils';

describe('remap', () => {
  test('maps correctly and filters based on allowedInventories', () => {
    const data: InventoryTypeResponse[] = [
      { id: 1, name: 'Type1' },
      { id: 2, name: 'Type2' },
      { id: 3, name: 'NotAllowed' },
    ];

    const result: InventoryType[] = remap(data);

    const expected = data
      .filter((item) => allowedInventories.includes(item.name))
      .map((item) => ({ label: item.name, value: item.id.toString() }));

    expect(result).toEqual(expected);
  });

  test('returns empty array if none are allowed', () => {
    const data: InventoryTypeResponse[] = [
      { id: 4, name: 'Forbidden1' },
      { id: 5, name: 'Forbidden2' },
    ];

    const result = remap(data);
    expect(result).toEqual([]);
  });

  test('returns empty array if input is empty', () => {
    expect(remap([])).toEqual([]);
  });
});
