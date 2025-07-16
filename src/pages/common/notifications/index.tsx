import { Table } from '@/components';
import { mockNotifications } from '@/components/organisms/notification-container/mock';
import { useMemo } from 'react';

const Notifications = () => {
  const columns = useMemo(() => {
    return [
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
        render: (row: (typeof mockNotifications)[0]) =>
          new Date(row.timestamp).toLocaleString(),
      },
      {
        id: 'viewed',
        label: 'Leído',
        render: (row: (typeof mockNotifications)[0]) =>
          row.viewed ? 'Sí' : 'No',
      },
    ];
  }, []);

  return <Table columns={columns} rows={mockNotifications} size="small" />;
};

export default Notifications;
