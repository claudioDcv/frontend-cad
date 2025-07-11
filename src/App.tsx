import { useEffect } from 'react';
import { Alert, Container } from '@mui/material';
import Router from './Router';
import useJWTNotification from './hooks/useJWTNotification';
import { VITE_MOCK_API } from './conf/http';
import { WebSocketProvider } from './libs/ws';

const wsConfig = {
  url: 'ws://172.16.22.240:3003/ws/notifications',
  token: '',
  heartbeatInterval: 30000,
  debug: true,
};

function App() {
  const jwtNotification = useJWTNotification();

  useEffect(() => {
    jwtNotification.requestCode();
  }, [jwtNotification]);

  return jwtNotification.token || VITE_MOCK_API ? (
    <Container maxWidth="xl">
      <WebSocketProvider
        config={{ ...wsConfig, token: `${jwtNotification.token}` }}
      >
        <Router hostUrl={jwtNotification.hostUrl} />
      </WebSocketProvider>
    </Container>
  ) : (
    <Alert severity="info" sx={{ marginTop: 2 }}>
      Cargando
    </Alert>
  );
}

export default App;
