import { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReceivableProps } from '@/clients/get-receivables/client';
import useGetReceivables from '@/clients/get-receivables';
import usePatchUpdateReceivable from '@/clients/patch-update-receivable';
import { FetchStatus } from '@/constants';
import { Receivable } from '@/entities/Receivable.entity';
import { AlertType } from '@/contexts/alert/types';
import { useAlertContext } from '@/contexts/alert/useAlertContext';
import { IconList } from '@/components';
import Pagination from '@/components/molecules/pagination';
import Table from '@/components/organisms/table';
import View from './components/view';
import tsStyles, { StyledStatusChip } from './index.styles';

const StatusChip = ({ status }: { status: boolean | null }) => {
  const { t } = useTranslation();
  return (
    <StyledStatusChip
      size="small"
      label={t(`accountsReceivable.receivableStatus.${status}`)}
      status={status}
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
        title: t('accountsReceivable.receivableStatus.true'),
      });
    } catch (error) {
      console.error(error);
    } finally {
      update.reset();
    }
  };

  const handleClose = () => {
    setReceivable(null);
  };

  const handleReject = async (data: Receivable) => {
    try {
      await update.call(data);
      alertContext.addAlert({
        type: AlertType.SUCCESS,
        title: t('accountsReceivable.receivableStatus.false'),
      });
    } catch (error) {
      console.error(error);
    } finally {
      update.reset();
    }
  };

  return (
    <div>
      <Box sx={tsStyles.tableContainer}>
        <Table
          messageVoidData={t('accountsReceivable.noData')}
          rows={receivables.data.content}
          columns={[
            {
              id: 'status',
              label: t('accountsReceivable.status'),
              render: (row) => <StatusChip status={row.status} />,
            },
            { id: 'contractId', label: t('accountsReceivable.contractId') },
            { id: 'quantity', label: t('accountsReceivable.quantity') },
            { id: 'weight', label: t('accountsReceivable.weight') },
            {
              id: 'createdByName',
              label: t('accountsReceivable.createdByName'),
            },
            {
              id: 'reviewedByName',
              label: t('accountsReceivable.reviewedByName'),
              render: (row) => row.reviewedByName || '-',
            },
            {
              id: 'typeName',
              label: t('accountsReceivable.typeName'),
              render: (row) => t(`inventoryType.${row.typeName}`),
            },
            {
              id: 'id',
              label: t('accountsReceivable.viewReceivable'),
              render: (row) => (
                <IconButton
                  aria-label={t('accountsReceivable.viewReceivable')}
                  onClick={() => setReceivable(row)}
                >
                  <IconList name="visualize" />
                </IconButton>
              ),
            },
          ]}
          loading={receivables.status === FetchStatus.LOADING}
        />

        <Box sx={tsStyles.paginationBox}>
          <Pagination {...receivables.data.meta} onChange={handleChangePage} />
        </Box>
      </Box>
      <View
        receivable={receivable}
        onClose={handleClose}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
};

export default ReceivablesAdmin;
