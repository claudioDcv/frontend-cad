import { vi } from 'vitest';
import { describe, expect, test } from 'vitest';
import { columns } from './index.utils';
import { Jewel } from '@/entities/Jewel.entity';
import { Column } from '../../organisms/table';
import { render } from '@testing-library/react';
import React from 'react';
import { Excerpt } from '@components/index';

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

describe('Modal Contract Utils - columns render', () => {
  test('should render description field with Excerpt component', () => {
    const descriptionCol = columns.find((col) => col.id === 'description');
    expect(descriptionCol).toBeDefined();

    const element = descriptionCol!.field?.(
      'A sample text'
    ) as React.ReactElement;
    const { getByText } = render(element);

    expect(getByText('A sample text')).toBeInTheDocument();
  });

  test('should render Excerpt directly to cover the component', () => {
    const { getByText } = render(
      <Excerpt text="Direct test text" maxLength={50} />
    );
    expect(getByText('Direct test text')).toBeInTheDocument();
  });

  test('should render description field with fallback for empty value', () => {
    const descriptionCol = columns.find((col) => col.id === 'description');
    expect(descriptionCol).toBeDefined();

    const element = descriptionCol!.field?.('') as React.ReactElement;
    const { container } = render(element);

    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
    expect(span?.textContent).toBe('');
  });
});
