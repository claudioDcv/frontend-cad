export type TableRow = Record<string, string | number | boolean>;

export const addTotalsRow = (
  rows: TableRow[],
  columns: { id: string; label: string }[],
  labelField?: string
): TableRow[] => {
  if (!rows.length) return rows;

  const totals: TableRow = columns.reduce((acc, col) => {
    acc[col.id] = rows.reduce((sum, row) => {
      const value = row[col.id];
      return sum + (typeof value === 'number' ? value : 0);
    }, 0);
    return acc;
  }, {} as TableRow);

  const labelKey = labelField || columns[0].id;
  totals[labelKey] = 'Total';
  totals['isTotal'] = true;

  return [...rows, totals];
};
