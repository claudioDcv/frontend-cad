import { useEffect } from 'react';
import { Alert, Container } from '@mui/material';
import Router from './Router';
import useJWTNotification from './hooks/useJWTNotification';
import { VITE_MOCK_API } from './conf/http';
import { SharedWebSocketProvider } from './libs/ws';
import NotificationProvider from './contexts/notification/NotificationProvider';

const wsConfig = {
  url: 'ws://172.16.22.240:3003/ws/notifications',
  token: '',
  heartbeatInterval: 30000,
  debug: false,
};

function App() {
  const jwtNotification = useJWTNotification();

  useEffect(() => {
    jwtNotification.requestCode();
  }, [jwtNotification]);

  return jwtNotification.token || VITE_MOCK_API ? (
    <Container maxWidth="xl">
      <NotificationProvider>
        <SharedWebSocketProvider
          config={{ ...wsConfig, token: `${jwtNotification.token}` }}
        >
          <Router hostUrl={jwtNotification.hostUrl} />
        </SharedWebSocketProvider>
      </NotificationProvider>
    </Container>
  ) : (
    <Alert severity="info" sx={{ marginTop: 2 }}>
      Cargando
    </Alert>
  );
}

export default App;
