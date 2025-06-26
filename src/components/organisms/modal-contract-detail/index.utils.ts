import { Jewel } from '../../../types';
import { formatCurrency, formatNumberWithGr } from '../../../utils';
import { Column } from '../../organisms/table';

export const columns: Column<Jewel>[] = [
  {
    id: 'number',
    label: 'Número',
  },
  {
    id: 'description',
    label: 'Descripción',
  },
  {
    id: 'family',
    label: 'Familia',
  },
  {
    id: 'quantity',
    label: 'Cantidad',
  },
  {
    id: 'value',
    label: 'Valor',
    render: (row) => formatCurrency(row.value ?? 0),
  },
  {
    id: 'weight',
    label: 'Peso',
    render: (row) => formatNumberWithGr(row.weight ?? 0),
  },
];
