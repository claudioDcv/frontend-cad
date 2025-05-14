import { render, screen } from '@testing-library/react';
import Table, { Column } from './index';
import { describe, test, expect } from 'vitest';

describe('Table component', () => {
  const columns: Column<{ name: string; age: number }>[] = [
    { label: 'Name', id: 'name', align: 'left' },
    { label: 'Age', id: 'age', align: 'right' },
  ];

  const rows = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
  ];

  test('Should render component with correct columns and rows', () => {
    render(<Table columns={columns} rows={rows} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });
});
