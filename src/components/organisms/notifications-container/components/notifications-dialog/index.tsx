import {
  Box,
  Button,
  Divider,
  LinearProgress,
  MenuItem,
  Typography,
} from '@mui/material';
import { Link } from 'wouter';
import routes from '@/conf/routes';
import CardNotification from '@/components/molecules/card-notification';
import { FetchStatus, validRoles } from '@/constants';
import useServices from '../../hooks/userServices';
import useAccess from '@/components/atoms/access/useAccess';
import tsStyles from './index.styles';

interface NotificationsDialogProps {
  onClose: () => void;
}

const NotificationsDialog = ({ onClose }: NotificationsDialogProps) => {
  const access = useAccess();
  const services = useServices({
    allNotifications: true,
  });

  const { data, status } = services.getAllNotifications;

  const getLink = () => {
    if (access([validRoles.admin])) return '';
    else if (access([validRoles.cordinator]))
      return routes.cordinator.notifications.link;
    return routes.operator.notifications.link;
  };

  if (status === FetchStatus.LOADING) {
    return <LinearProgress />;
  }

  return (
    <Box sx={tsStyles.container}>
      <Box sx={tsStyles.headerBox}>
        <Typography variant="subtitle1">Notificaciones</Typography>
      </Box>
      <Divider />
      <Box sx={tsStyles.contentBox}>
        {data.meta.count === 0 ? (
          <MenuItem disabled>No hay notificaciones</MenuItem>
        ) : (
          data.content.map((notification) => (
            <CardNotification data={notification} key={notification.id} />
          ))
        )}
      </Box>
      <Divider />
      <Box sx={tsStyles.footerBox}>
        <Link to={getLink()}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onClose}
          >
            Ver todas
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default NotificationsDialog;
