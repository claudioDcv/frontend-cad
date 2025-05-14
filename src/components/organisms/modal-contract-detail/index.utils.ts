import { Jewel } from '../../../types';
import { Column } from '../../organisms/table';

export const columns: Column<Jewel>[] = [
    {
        id: 'id',
        label: '#',
    }, {
        id: 'label',
        label: 'Nombre',
    },
];
