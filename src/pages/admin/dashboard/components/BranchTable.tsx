import { Table } from '@/components';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Visibility } from '@mui/icons-material';

type TableRow = Record<string, string | number | boolean>;

interface BranchTableProps {
  branchRows: TableRow[];
  onDetailBranch: (branch: TableRow) => void;
}

const BranchTable: React.FC<BranchTableProps> = ({
  branchRows,
  onDetailBranch = (branch) =>
    console.log('Detalle sucursal (placeholder):', branch),
}) => {
  const { t } = useTranslation();

  return (
    <Table
      columns={[
        { id: 'branch', label: 'Sucursal' },
        { id: 'resolution', label: 'N° Resolución' },
        { id: 'contracts', label: 'Número de Contratos' },
        { id: 'contractValue', label: 'Valor Resolución' },
        { id: 'goldGrams', label: 'Gramos de Oro (CR + CI)' },
        { id: 'showcaseGrams', label: 'Gramos de Oro Vitrina' },
        { id: 'goldWatches', label: 'Unidad Relojes Oro' },
        { id: 'ingots', label: 'Lingotes' },
        { id: 'coins', label: 'Monedas' },
        { id: 'silverGrams', label: 'Gramos Plata (AG)' },
        { id: 'exclusiveBrandUnits', label: 'Unidad Relojes Marca Exclusiva' },
        {
          id: 'actions',
          label: t('common.actions'),
          render: (row: TableRow) => (
            <Box display="flex" gap={1}>
              <Tooltip title={t('common.view')}>
                <IconButton onClick={() => onDetailBranch(row)}>
                  <Visibility />
                </IconButton>
              </Tooltip>
            </Box>
          ),
        },
      ]}
      rows={branchRows}
      messageVoidData={t('common.noData')}
      size="small"
    />
  );
};

export default BranchTable;
