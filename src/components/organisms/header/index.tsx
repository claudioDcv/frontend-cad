import { Breadcrumb, NotificationsContainer } from '@/components';
import breadcrumbs from '@/conf/breadcrumbs';
import { Box } from '@mui/material';
import { useLocation } from 'wouter';
import { matchRoute } from './index.utils';
import tsStyles from './index.styles';
import Receiver from '../notifications-container/components/receiver';

const Header = () => {
  const [location] = useLocation();
  return (
    <Box sx={tsStyles.headerStyles}>
      <Breadcrumb items={matchRoute(location, breadcrumbs)?.match || []} />
      <Receiver />
      <NotificationsContainer />
    </Box>
  );
};

export default Header;
