import { useEffect, useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  ListItemText,
  MenuItem,
  Typography,
} from '@mui/material';
import { Link } from 'wouter';
import routes from '@/conf/routes';
import MailIcon from '@mui/icons-material/Mail';
import { Notification } from './index.types';

const NotificationDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // 🔹 Simulamos fetch inicial solo del conteo (como viene del endpoint /notifications/unviewed)
  useEffect(() => {
    const mockCounts = [
      { type: 'new-resolution', count: 5 },
      { type: 'new-cpc', count: 0 },
      { type: 'cancel-cpc', count: 2 },
      { type: 'new-any', count: 3 },
    ];

    const total = mockCounts.reduce((sum, item) => sum + item.count, 0);
    setUnreadCount(total);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      // Simular llamada a /notifications?viewed=false...
      const mockNotifs = [
        {
          id: '1',
          title: 'Nuevo contrato agregado',
          message: 'Se agregó el contrato 123456.',
          date: new Date().toISOString(),
          read: false,
        },
        {
          id: '2',
          title: 'Contrato cancelado',
          message: 'El contrato 789012 fue cancelado.',
          date: new Date().toISOString(),
          read: false,
        },
      ];

      setNotifications(mockNotifs);
    }
  }, [drawerOpen]);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <Badge badgeContent={unreadCount} color="error">
          <MailIcon />
        </Badge>
      </IconButton>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box display="flex" flexDirection="column" height="100%" width={360}>
          <Box px={2} py={1}>
            <Typography variant="subtitle1">Notificaciones</Typography>
          </Box>
          <Divider />
          <Box flex={1} overflow="auto">
            {notifications.length === 0 ? (
              <MenuItem disabled>No hay notificaciones</MenuItem>
            ) : (
              notifications.map((n) => (
                <MenuItem
                  key={n.id}
                  onClick={() => {
                    handleMarkAsRead(n.id);
                    setDrawerOpen(false);
                  }}
                  sx={{ whiteSpace: 'normal' }}
                >
                  <ListItemText
                    primary={n.title}
                    secondary={n.message}
                    primaryTypographyProps={{
                      fontWeight: n.read ? 'normal' : 'bold',
                    }}
                  />
                </MenuItem>
              ))
            )}
          </Box>
          <Divider />
          <Box p={2}>
            <Link to={routes.notifications.link}>
              <Button fullWidth variant="contained" color="primary">
                Ver todas
              </Button>
            </Link>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default NotificationDrawer;
