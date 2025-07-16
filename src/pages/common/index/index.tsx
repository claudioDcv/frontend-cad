import routes from '@/conf/routes';
import { Box, Button, Stack, Paper } from '@mui/material';
import { Link } from 'wouter';

const Index = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f4f6f8"
    >
      <Paper elevation={3} sx={{ p: 5, borderRadius: 3, minWidth: 300 }}>
        <Stack spacing={2} mt={3}>
          <Link href={routes.operator.documents.link}>
            <Button
              variant="contained"
              fullWidth
              sx={{ textTransform: 'none' }}
            >
              Operador
            </Button>
          </Link>

          <Link href={routes.cordinator.documents.link}>
            <Button
              variant="outlined"
              fullWidth
              sx={{ textTransform: 'none' }}
            >
              Cordinador
            </Button>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Index;
