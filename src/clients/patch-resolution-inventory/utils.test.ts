import { describe, test, expect } from 'vitest';
import { getBody } from './utils';
import type { ResolutionInventory } from '@/entities/ResolutionInventory.entity';

describe('getBody function', () => {
  test('should map inventories correctly and stringify', () => {
    const data: ResolutionInventory = {
      inventories: [
        {
          inventoryType: { value: '1', label: 'Type1' },
          weight: 2.5,
          quantity: 3,
        },
        {
          inventoryType: { value: '2', label: 'Type2' },
          weight: 1,
          quantity: 5,
        },
      ],
    } as ResolutionInventory;

    const result = getBody(data);
    expect(result).toBe(
      JSON.stringify([
        { inventoryTypeId: 1, weight: 2.5, quantity: 3 },
        { inventoryTypeId: 2, weight: 1, quantity: 5 },
      ])
    );
  });

  test('should return empty array string if inventories is empty', () => {
    const data: ResolutionInventory = {
      id: 0,
      inventories: [],
    } as ResolutionInventory;

    const result = getBody(data);
    expect(result).toBe(JSON.stringify([]));
  });
});
