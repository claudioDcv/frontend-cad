import { useNotification } from '@/contexts/notification/useNotification';
import { useSharedWebSocket, useSharedWebSocketAutoReconnect } from '@/libs/ws';
import { useEffect, useRef } from 'react';

const Receiver = () => {
  const notificationCtx = useNotification();
  const init = useRef<boolean>(false);
  const { isConnected, isConnecting, lastMessage, connect, subscribe } =
    useSharedWebSocket();

  const { isReconnecting } = useSharedWebSocketAutoReconnect(
    true, // habilitado
    5, // máximo 5 intentos
    3000 // 3 segundos entre intentos
  );

  useEffect(() => {
    if (!isConnected && !init.current && !isReconnecting) {
      init.current = true;
      connect();
    }
    if (isConnected && init.current && !isReconnecting) {
      subscribe('alerts');
    }
  }, [isConnected, connect, isReconnecting, subscribe]);

  useEffect(() => {
    if (lastMessage?.type === 'notification') {
      notificationCtx.add();
    }
  }, [notificationCtx, lastMessage]);

  return <div>{JSON.stringify({ isConnecting, isConnected })}</div>;
};

export default Receiver;
