import { Jewel } from '@/entities/Jewel.entity';
import { formatCurrency, formatNumberWithGr } from '../../../utils';
import { Column } from '../table';
import { Excerpt } from '@components/index';

// TODO: Translate labels

export const columns: Column<Jewel>[] = [
  {
    id: 'number',
    label: 'Número',
  },
  {
    id: 'description',
    label: 'Descripción',
    field: (d) => (
      <Excerpt text={(d as string) || ''} maxLength={50} />
    ),
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
