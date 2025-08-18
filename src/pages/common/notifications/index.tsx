import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, ReviewStatus, Confirm, TripleToggleSwitch, ResolutionDetailButton } from '@/components';
import useServices from './hooks/userServices';
import { Notification } from '@/entities/Notification.entity';
import { formatToFullDateHour } from '@/utils';
import { useToggleState } from '@/hooks/useToggleState';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Pagination } from '@mui/material';
import { FetchStatus } from '@/constants';
import ModalHeader from '@/components/molecules/modal-header';

const Notifications = () => {
  const { t } = useTranslation();
  const toggle = useToggleState();
  const [filters, setFilters] = useState<{
    page: number,
    viewed: boolean | undefined,
  }>({
    page: 1,
    viewed: undefined,
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notification, setNotification] = useState<Notification | null>(null);
  const {
    getAllNotifications: { data, call },
    pathViewedNotification: { call: pathViewedCall, status: pathViewedStatus, clearData: clearPathViewedData },
  } = useServices({
    allNotifications: true,
  });

  useEffect(() => {
    if (data) {
      setNotifications(data.content);
    }
  }, [data]);

  useEffect(() => {
    if (pathViewedStatus === FetchStatus.SUCCESS) {
      setNotifications((prev) => prev.map((n) => {
        if (n.id === notification?.id) {
          return { ...n, viewed: true };
        }
        return n;
      }));
      toggle.close();
      clearPathViewedData();
    }
  }, [clearPathViewedData, notification?.id, pathViewedStatus, toggle]);

  const handleNotificationClick = (notification: Notification) => {
    setNotification(notification);
    toggle.open();
  };

  const handleCall = (filter: { [key: string]: unknown }) => {
    setFilters((prev) => ({ ...prev, ...filter }));
    call({ ...filters, ...filter });
  };

  const handleChangePage = (_p: unknown, page: number) => {
    handleCall({ page });
  };

  const handleChangeViewed = (value: unknown) => {
    handleCall({ viewed: value as boolean | undefined, page: 1 });
  };

  const handleMarkAsViewed = (notification: Notification) => {
    pathViewedCall(notification.id);
  };

  const columns = [
    {
      id: 'type',
      label: 'Tipo',
    },
    {
      id: 'message',
      label: 'Mensaje',
    },
    {
      id: 'timestamp',
      label: 'Fecha',
      render: (row: Notification) => formatToFullDateHour(row.timestamp),
    },
    {
      id: 'viewed',
      label: 'Leído',
      render: (row: Notification) => (
        <div>
          <ResolutionDetailButton
            id={String(row.entityId)}
            label={t('common.view')}
          />
          <ReviewStatus value={row.viewed} onView={() => handleNotificationClick(row)} /></div>),
    },
  ];

  const viewedOptions = [
    { value: undefined, label: 'Todos' },
    { value: false, label: 'No Leído' },
    { value: true, label: 'Leído' },
  ];

  return (
    <div>
      <Box display="flex" alignItems="center" mb={2}>
        <TripleToggleSwitch
          value={filters.viewed}
          options={viewedOptions}
          onChange={handleChangeViewed}
        />
      </Box>
      <Table columns={columns} rows={notifications} size="small" />
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Pagination
          {...data.meta}
          onChange={handleChangePage}
        />
      </Box>
      <Dialog open={toggle.isOpen} onClose={toggle.close}>
        <ModalHeader onClose={toggle.close} title="Detalles de la notificación" />
        <DialogContent>
          <DialogContentText>
            {notification ? notification.message : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Confirm response={handleMarkAsViewed}>
            {(open) => (
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => open(notification)}
              >Marcar como leído
              </Button>
            )}
          </Confirm>
          <Button onClick={toggle.close} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Notifications;
