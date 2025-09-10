import { useLocation, Link, Route, Switch } from 'wouter';
import { Box, Button, ButtonGroup, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import routes from '@/conf/routes';
import PreInventory from './pre-inventory';
import PostInventory from './post-inventory';
import PostMovement from './post-movement';
import tsStyles from './index.styles';

const Dashboard = () => {
  const [location] = useLocation();
  const { t } = useTranslation();

  const tabs = [
    {
      link: routes.admin.preInventory.link,
      label: routes.admin.preInventory.label,
    },
    {
      link: routes.admin.postInventory.link,
      label: routes.admin.postInventory.label,
    },
    {
      link: routes.admin.postMovement.link,
      label: routes.admin.postMovement.label,
    },
  ];

  return (
    <>
      <Box sx={tsStyles.header}>
        <Link href={routes.admin.receivable.link}>
          <Button variant="outlined" fullWidth>
            Cuentas por Cobrar
          </Button>
        </Link>
      </Box>

      <ButtonGroup variant="text">
        {tabs.map((tab) => (
          <Link key={tab.link} href={tab.link}>
            <Button
              sx={tsStyles.buttonTabStyle(location === tab.link)}
              color={location === tab.link ? 'primary' : 'inherit'}
            >
              {t(tab.label)}
            </Button>
          </Link>
        ))}
      </ButtonGroup>

      <Divider />

      <Switch>
        <Route path={routes.admin.preInventory.link}>
          <PreInventory />
        </Route>
        <Route path={routes.admin.postInventory.link}>
          <PostInventory />
        </Route>
        <Route path={routes.admin.postMovement.link}>
          <PostMovement />
        </Route>
      </Switch>
    </>
  );
};

export default Dashboard;
