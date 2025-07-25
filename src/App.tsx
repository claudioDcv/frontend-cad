import { useEffect } from 'react';
import { Alert, Container } from '@mui/material';
import Router from './Router';
import useJWTNotification from './hooks/useJWTNotification';
import { VITE_MOCK_API, WEBSOCKET_BASE } from './conf/http';
import { WebSocketProvider } from './contexts/websocket';
import NotificationProvider from './contexts/notification/NotificationProvider';

const wsConfig = {
  url: WEBSOCKET_BASE,
  token: '',
  heartbeatInterval: 30000,
  debug: false,
  connectionType: 'stomp' as const,
  maxReconnectAttempts: 5,
};

function App() {
  const jwtNotification = useJWTNotification();

  useEffect(() => {
    jwtNotification.requestCode();
  }, [jwtNotification]);

  return jwtNotification.token || VITE_MOCK_API ? (
    <Container maxWidth="xl">
      <NotificationProvider>
        <WebSocketProvider
          config={{
            ...wsConfig,
            token: jwtNotification.token || '',
          }}
        >
          <Router hostUrl={jwtNotification.hostUrl} />
        </WebSocketProvider>
      </NotificationProvider>
    </Container>
  ) : (
    <Alert severity="info" sx={{ marginTop: 2 }}>
      Cargando token de autenticación...
    </Alert>
  );
}

export default App;
