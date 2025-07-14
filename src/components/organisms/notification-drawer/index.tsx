import { useState } from 'react';
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

const NotificationDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const services = useServices();

  const getUnreadTotal = () => {
    return (
      services.getUnviewedNotifications.data?.reduce(
        (sum, item) => sum + item.count,
        0
      ) ?? 0
    );
  };

  const getAllNotifications = services.getAllNotifications.data ?? [];

  return (
    <>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <Badge badgeContent={getUnreadTotal()} color="error">
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
