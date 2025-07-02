import { describe, expect, test } from 'vitest';
import { columns } from './index.utils';
import { Jewel } from '@/entities/Jewel.entity';
import { Column } from '../../organisms/table';

describe('Utils for Modal Contract', () => {
  test('should define the correct column structure (id and label only)', () => {
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

  test('should have correct column IDs', () => {
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
