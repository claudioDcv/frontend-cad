import { useEffect } from 'react';
import {
  Badge,
  Drawer,
  IconButton,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import useServices from './hooks/userServices';
import { useNotification } from '@/contexts/notification/useNotification';
import { FetchStatus } from '@/constants';
import { useToggleState } from '@/hooks/useToggleState';
import NotificationsDialog from './components/notifications-dialog';

const NotificationsContainer = () => {
  const toggle = useToggleState();
  const services = useServices({
    unviewedNotifications: true,
  });
  const notificationCtx = useNotification();
  const setter = notificationCtx.setUnviewedCounter;

  useEffect(() => {
    const { status, count } = services.getUnviewedNotifications;
    if (status === FetchStatus.SUCCESS) {
      setter((prev) => (prev === 0 ? count : prev));
    }
  }, [services.getUnviewedNotifications, setter]);

  return (
    <>
      <IconButton onClick={toggle.open}>
        <Badge
          badgeContent={notificationCtx.unviewedCounter}
          color="error"
          max={notificationCtx.unviewedCounter + 1000}
        >
          <MailIcon />
        </Badge>
      </IconButton>

      <Drawer anchor="right" open={toggle.isOpen} onClose={toggle.close}>
        {toggle.isOpen && <NotificationsDialog onClose={toggle.close} />}
      </Drawer>
    </>
  );
};

export default NotificationsContainer;
