import { describe, test, expect } from 'vitest';
import type { MaterialType } from '@/entities/MaterialType.entity';
import { remap } from './utils';

describe('remap function for MaterialType', () => {
  test('should map MaterialType[] to { label, value }[] correctly', () => {
    const materials: MaterialType[] = [
      {
        categoryId: 1,
        categoryName: 'Metal',
        categoryCode: '',
        measurementUnit: '',
        minimumProfitMargin: 0,
      },
      {
        categoryId: 2,
        categoryName: 'Plastic',
        categoryCode: '',
        measurementUnit: '',
        minimumProfitMargin: 0,
      },
    ];

    const expected = [
      { value: '1', label: 'Metal' },
      { value: '2', label: 'Plastic' },
    ];

    expect(remap(materials)).toEqual(expected);
  });

  test('should return empty array when input is empty', () => {
    const materials: MaterialType[] = [];
    expect(remap(materials)).toEqual([]);
  });
});
