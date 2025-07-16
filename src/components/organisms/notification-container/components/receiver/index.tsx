import { useNotification } from '@/contexts/notification/useNotification';
import { useWebSocket } from '@/contexts/websocket';
import { Notification } from '@/entities/Notification.entity';
import { useEffect, useRef } from 'react';

const Receiver = () => {
  const notificationCtx = useNotification();
  const init = useRef<boolean>(false);
  const { isConnected, isConnecting, lastJsonMessage, subscribe } =
    useWebSocket();

  useEffect(() => {
    if (isConnected && !init.current) {
      init.current = true;
      subscribe('alerts');
    }
  }, [isConnected, subscribe]);

  const add = notificationCtx.add;

  useEffect(() => {
    const notifications = lastJsonMessage?.data as Notification;
    console.log(lastJsonMessage);
    if (lastJsonMessage?.type === 'notification' && notifications?.entity) {
      add();
    }
  }, [add, lastJsonMessage]);

    return (
      <span
        style={{
          width: 15,
          height: 15,
          borderRadius: '50%',
          marginLeft: 'auto',
          marginRight: 8,
          backgroundColor: isConnecting
            ? 'orange'
            : isConnected
            ? 'green'
            : 'red',
        }}
      />
  );
};

export default Receiver;
