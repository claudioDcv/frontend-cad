import { Breadcrumb, NotificationContainer } from '@/components';
import breadcrumbs from '@/conf/breadcrumbs';
import { Box } from '@mui/material';
import { useLocation } from 'wouter';
import { matchRoute } from './index.utils';

const Header = () => {
  const [location] = useLocation();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ my: 1.2 }}
    >
      <Breadcrumb items={matchRoute(location, breadcrumbs)?.match || []} />
      <NotificationContainer />
    </Box>
  );
};

export default Header;
