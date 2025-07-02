import { Jewel } from '@/entities/Jewel.entity';
import { formatCurrency, formatNumberWithGr } from '../../../utils';
import { Column } from '../../organisms/table';

// TODO: Translate labels

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
    render: (row) => formatCurrency(row.value),
  },
  {
    id: 'weight',
    label: 'Peso',
    render: (row) => formatNumberWithGr(row.weight),
  },
];
