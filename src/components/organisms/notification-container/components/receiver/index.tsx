import { useNotification } from '@/contexts/notification/useNotification';
import { useWebSocket } from '@/contexts/websocket';
import { useEffect, useRef } from 'react';

const Receiver = () => {
  const notificationCtx = useNotification();
  const init = useRef<boolean>(false);
  const { 
    isConnected, 
    isConnecting, 
    lastJsonMessage, 
    subscribe,
    readyState 
  } = useWebSocket();

  useEffect(() => {
    if (isConnected && !init.current) {
      init.current = true;
      subscribe('alerts');
    }
  }, [isConnected, subscribe]);

  useEffect(() => {
    if (lastJsonMessage?.type === 'notification') {
      notificationCtx.add();
    }
  }, [notificationCtx, lastJsonMessage]);

  return <div>{JSON.stringify({ isConnecting, isConnected, readyState })}</div>;
};

export default Receiver;
