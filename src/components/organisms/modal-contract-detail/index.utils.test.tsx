import { describe, expect, test } from 'vitest';
import { Jewel } from '../../../types';
import { Column } from '../../organisms/table';
import { columns } from './index.utils';

describe('Utils for Modal Contract', () => {
  test('should define the correct column structure', () => {
    const expectedColumns: Column<Jewel>[] = [
      { id: 'id', label: '#' },
      { id: 'label', label: 'Nombre' },
    ];

    expect(columns).toEqual(expectedColumns);
  });

  test('should have correct column IDs', () => {
    const columnIds = columns.map((col) => col.id);
    expect(columnIds).toEqual(['id', 'label']);
  });
});