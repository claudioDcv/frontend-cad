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
import CardNotification from '@/components/molecules/card-notification';
import useServices from './hooks/userServices';
import { useNotification } from '@/contexts/notification/useNotification';
import { FetchStatus } from '@/constants';

const NotificationContainer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const services = useServices();
  const notificationCtx = useNotification();
  const setter = notificationCtx.setUnviewedCounter;

  useEffect(() => {
    const { status, data } = services.getUnviewedNotifications;
    if (status === FetchStatus.SUCCESS) {
      const count = data.reduce((sum, item) => sum + item.count, 0);
      setter((prev) => (prev === 0 ? count : prev));
    }
  }, [services.getUnviewedNotifications, setter]);

  const getAllNotifications = services.getAllNotifications.data;

  return (
    <>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <Badge
          badgeContent={notificationCtx.unviewedCounter}
          color="error"
          max={1000000}
        >
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
            {getAllNotifications.meta.count === 0 ? (
              <MenuItem disabled>No hay notificaciones</MenuItem>
            ) : (
              getAllNotifications.notifications.map((n) => (
                <CardNotification data={n} key={n.id} />
              ))
            )}
          </Box>
          <Divider />
          <Box p={2}>
            <Link to={routes.cordinator.notifications.link}>
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

export default NotificationContainer;
