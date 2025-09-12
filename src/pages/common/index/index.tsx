import routes from '@/conf/routes';
import { Box, Button, Stack, Paper } from '@mui/material';
import { Link } from 'wouter';
import ResolutionReset from '@/modules/resolution-reset/components';
import tsStyles from './index.styles';

const Index = () => {
  return (
    <Box sx={tsStyles.mainBox}>
      <Paper elevation={3} sx={tsStyles.paper}>
        <Stack spacing={2} sx={tsStyles.stack}>
          <ResolutionReset />
          <Link href={routes.operator.documents.link}>
            <Button variant="outlined" fullWidth>
              Operador
            </Button>
          </Link>

          <Link href={routes.cordinator.documents.link}>
            <Button variant="outlined" fullWidth>
              Cordinador
            </Button>
          </Link>

          <Link href={routes.admin.receivable.link}>
            <Button variant="outlined" fullWidth>
              Administrador
            </Button>
          </Link>
          <Link href={routes.admin.dashboard.link}>
            <Button variant="outlined" fullWidth>
              Administrador Pre Inventario
            </Button>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Index;
