import { useGetReceivables } from '@/clients';
import { ReceivableProps } from '@/clients/get-receivables/client';
import { IconList } from '@/components';
import Pagination from '@/components/molecules/pagination';
import Table from '@/components/organisms/table';
import { FetchStatus } from '@/constants';
import { Box, Chip, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import View from './components/view';
import { Receivable } from '@/entities/Receivable.entity';
import usePatchUpdateReceivable from '@/clients/patch-update-receivable';
import { useAlertContext } from '@/contexts/alert/useAlertContext';
import { AlertType } from '@/contexts/alert/types';

const StatusChip = ({ status }: { status: boolean | null }) => {
  const { t } = useTranslation();
  return (
    <Chip
      size="small"
      label={t(`accountsReceivable.receivableStatus.${status}`)}
      color={
        status === true ? 'success' : status === false ? 'error' : 'default'
      }
    />
  );
};

const ReceivablesAdmin = () => {
  const alertContext = useAlertContext();
  const update = usePatchUpdateReceivable();
  const [receivable, setReceivable] = useState<Receivable | null>(null);
  const [filters, setFilters] = useState<ReceivableProps>({
    page: 1,
    size: 15,
  });
  const { t } = useTranslation();
  const receivables = useGetReceivables();

  useEffect(() => {
    if (receivables.status === FetchStatus.IDLE) {
      receivables.call(filters);
    }
  }, [filters, receivables]);

  const handleChangePage = (_p: unknown, page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    receivables.call({
      ...filters,
      page,
    });
  };

  const handleAccept = async (data: Receivable) => {
    try {
      await update.call(data);
      alertContext.addAlert({
        type: AlertType.SUCCESS,
        title: 'Cuenta por Cobrar Aceptada',
      });
    } catch (error) {
      console.error(error);
    } finally {
      update.reset();
    }
  };

  const handleReject = async (data: Receivable) => {
    try {
      await update.call(data);
      alertContext.addAlert({
        type: AlertType.SUCCESS,
        title: 'Cuenta por Cobrar Rechazada',
      });
    } catch (error) {
      console.error(error);
    } finally {
      update.reset();
    }
  };

  return (
    <div>
      <Box mt={2}>
        <Table
          messageVoidData="No hay cuentas por cobrar"
          rows={receivables.data.content}
          columns={[
            {
              id: 'status',
              label: 'Estado',
              render: (row) => <StatusChip status={row.status} />,
            },
            { id: 'contractId', label: 'Contrato' },
            { id: 'quantity', label: 'Cantidad' },
            { id: 'weight', label: 'Peso' },
            { id: 'createdByName', label: 'Creado por' },
            {
              id: 'reviewedByName',
              label: 'Revisado por',
              render: (row) => row.reviewedByName || '-',
            },
            {
              id: 'typeName',
              label: 'Tipo',
              render: (row) => t(`inventoryType.${row.typeName}`),
            },
            {
              id: 'id',
              label: 'Ver',
              render: (row) => (
                <IconButton
                  aria-label={t('common.view')}
                  onClick={() => setReceivable(row)}
                >
                  <IconList name="visualize" />
                </IconButton>
              ),
            },
          ]}
          loading={receivables.status === FetchStatus.LOADING}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Pagination {...receivables.data.meta} onChange={handleChangePage} />
        </Box>
      </Box>
      <View
        receivable={receivable}
        onClose={() => setReceivable(null)}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
};

export default ReceivablesAdmin;
