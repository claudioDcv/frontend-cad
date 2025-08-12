import { useEffect } from 'react';
import { Alert, Container } from '@mui/material';
import Router from './Router';
import useJWTNotification from './hooks/useJWTNotification';
import { VITE_MOCK_API, WEBSOCKET_BASE } from './conf/http';
import { WebSocketProvider } from './contexts/websocket';
import NotificationProvider from './contexts/notification/NotificationProvider';
import InitialDataProvider from './contexts/initial-data/InitialDataProvider';
import { DEBUG } from './conf/envs';

const wsConfig = {
  url: WEBSOCKET_BASE,
  token: '',
  heartbeatInterval: 30000,
  debug: DEBUG,
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
      <InitialDataProvider>
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
      </InitialDataProvider>
    </Container>
  ) : (
    <Alert severity="info" sx={{ marginTop: 2 }}>
      Cargando token de autenticación...
    </Alert>
  );
}

export default App;
