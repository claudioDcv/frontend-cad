import { useEffect } from 'react';
import { Container } from '@mui/material';
import Router from './Router';

import useJWTNotification from './hooks/useJWTNotification';

function App() {
  const jwtNotification = useJWTNotification();

  useEffect(() => {
    jwtNotification.requestCode();
  }, [jwtNotification]);

  return jwtNotification.token ? (
    <Container maxWidth="xl">
      <Router />
    </Container>
  ) : (
    <div>waiting for JWT...</div>
  );
}

export default App;
