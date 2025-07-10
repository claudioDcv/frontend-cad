import { Breadcrumb, NotificationDrawer, Table } from '@/components';
import routes from '@/conf/routes';
import { Box } from '@mui/material';
import { useMemo } from 'react';

const Notifications = () => {
  const mockNotifications = [
    {
      id: '1',
      title: 'Nuevo contrato agregado',
      message: 'Se agregó el contrato 123456.',
      date: '2024-07-10 12:34',
      read: false,
    },
    {
      id: '2',
      title: 'Contrato cancelado',
      message: 'El contrato 789012 fue cancelado.',
      date: '2024-07-09 09:12',
      read: true,
    },
    {
      id: '3',
      title: 'CPC nueva',
      message: 'Se ha generado una nueva CPC.',
      date: '2024-07-08 16:22',
      read: false,
    },
  ];

  const columns = useMemo(() => {
    return [
      {
        id: 'title',
        label: 'Título',
      },
      {
        id: 'message',
        label: 'Mensaje',
      },
      {
        id: 'date',
        label: 'Fecha',
      },
      {
        id: 'read',
        label: 'Leído',
      },
    ];
  }, []);
  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Breadcrumb items={[routes.index, routes.notifications]} />
        <NotificationDrawer />
      </Box>

      <Table columns={columns} rows={mockNotifications} size="small" />
    </div>
  );
};

export default Notifications;
