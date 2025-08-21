import routes from '@/conf/routes';
import { Box, Button, Stack, Paper } from '@mui/material';
import { Link } from 'wouter';
import ResolutionReset from '@/modules/resolution-reset/components';
import theme from '@/conf/theme';

const Index = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor={theme.palette.background.default}
    >
      <Paper elevation={3} sx={{ p: 5, borderRadius: 3, minWidth: 300 }}>
        <Stack spacing={2} mt={3}>
          <ResolutionReset />
          <Link href={routes.operator.documents.link}>
            <Button
              variant="outlined"
              fullWidth
            >
              Operador
            </Button>
          </Link>

          <Link href={routes.cordinator.documents.link}>
            <Button
              variant="outlined"
              fullWidth
            >
              Cordinador
            </Button>
          </Link>

          <Link href={routes.admin.receivable.link}>
            <Button
              variant="outlined"
              fullWidth
            >
              Administrador
            </Button>
          </Link>
          <Link href={routes.admin.preInventory.link}>
            <Button
              variant="outlined"
              fullWidth
            >
              Administrador Pre Inventario
            </Button>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Index;
