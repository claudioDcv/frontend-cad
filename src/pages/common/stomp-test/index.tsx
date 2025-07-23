import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import StompTestPanel from '../../../components/molecules/stomp-test-panel';

const StompTestPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          🧪 Página de Prueba STOMP WebSocket
        </Typography>
        
        <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 4 }}>
          Esta página permite probar la funcionalidad STOMP WebSocket en tiempo real
        </Typography>

        <StompTestPanel />
      </Box>
    </Container>
  );
};

export default StompTestPage;
