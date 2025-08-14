import { Table, ReviewStatus } from '@/components';
import { useState } from 'react';
import useServices from './hooks/userServices';
import { Notification } from '@/entities/Notification.entity';
import { formatToFullDateHour } from '@/utils';
import { useToggleState } from '@/hooks/useToggleState';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination } from '@mui/material';

const Notifications = () => {
  const toggle = useToggleState();
  const [notification, setNotification] = useState<Notification | null>(null);
  const { getAllNotifications: { data, call } } = useServices({
    allNotifications: true,
  });

  const handleNotificationClick = (notification: Notification) => {
    setNotification(notification);
    toggle.open();
  };

  const handleChangePage = (_p: unknown, page: number) => {
    call({ page });
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
      render: (row: Notification) => <ReviewStatus value={row.viewed} onView={() => handleNotificationClick(row)} />,
    },
  ];

  return (
    <div>
      <Table columns={columns} rows={data.content} size="small" />
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Pagination
          {...data.meta}
          onChange={handleChangePage}
        />
      </Box>
      <Dialog open={toggle.isOpen} onClose={toggle.close}>
        <DialogTitle>Detalles de la notificación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {notification ? notification.message : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle.close} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Notifications;
