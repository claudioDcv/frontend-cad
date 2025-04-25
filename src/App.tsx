import { useEffect } from 'react';
import useJWTNotification from './hooks/useJWTNotification'
import Index from './pages/index';

function App() {
  const jwtNotification = useJWTNotification();

  useEffect(() => {
    jwtNotification.requestCode();
  }, [jwtNotification]);

  return jwtNotification.token ? (
    <Index />
  ) : (
    <div>waiting for JWT...</div>
  );
}

export default App
