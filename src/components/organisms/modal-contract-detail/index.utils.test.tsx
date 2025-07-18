import { vi } from 'vitest';
import { describe, expect, test } from 'vitest';
import { columns } from './index.utils';
import { Jewel } from '@/entities/Jewel.entity';
import { Column } from '../../organisms/table';

vi.mock('@/utils', () => ({
  toDay: () => new Date('2025-07-18T00:00:00.000Z'),
}));

describe('Modal Contract Utils - columns definition', () => {
  test('should have the expected columns with correct id and label', () => {
    const expectedColumns: Pick<Column<Jewel>, 'id' | 'label'>[] = [
      { id: 'number', label: 'Número' },
      { id: 'description', label: 'Descripción' },
      { id: 'family', label: 'Familia' },
      { id: 'quantity', label: 'Cantidad' },
      { id: 'value', label: 'Valor' },
      { id: 'weight', label: 'Peso' },
    ];

    const simplified = columns.map(({ id, label }) => ({ id, label }));
    expect(simplified).toEqual(expectedColumns);
  });

  test('should have correct column ids in order', () => {
    const columnIds = columns.map((col) => col.id);
    expect(columnIds).toEqual([
      'number',
      'description',
      'family',
      'quantity',
      'value',
      'weight',
    ]);
  });
});
