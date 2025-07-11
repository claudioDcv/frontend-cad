import { useEffect, useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import { Link } from 'wouter';
import routes from '@/conf/routes';
import MailIcon from '@mui/icons-material/Mail';
import { mockNotifications } from './mock';
import { Notification } from '@/entities/Notification.entity';
import CardNotification from '@/components/molecules/card-notification';

const NotificationDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simular /notifications/unviewed)
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
      setNotifications(mockNotifications);
    }
  }, [drawerOpen]);


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
                <CardNotification data={n} key={n.notificationId}/>
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
