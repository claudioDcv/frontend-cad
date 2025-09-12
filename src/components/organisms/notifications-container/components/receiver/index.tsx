import { useEffect } from 'react';
import { useNotification } from '@/contexts/notification/useNotification';
import { useWebSocket } from '@/contexts/websocket';
import useAllowedNotificationType from '@/hooks/useAllowedNotificationType';
import styles from './index.module.css';

const Receiver = () => {
  const { isAllowedType } = useAllowedNotificationType();
  const notificationCtx = useNotification();
  const { isConnected, isConnecting, lastNotification, config } =
    useWebSocket();

  const add = notificationCtx.add;

  // Manejar notificaciones STOMP
  useEffect(() => {
    if (config?.connectionType === 'stomp' && lastNotification) {
      if (isAllowedType(lastNotification.type)) {
        add();
      }
    }
  }, [add, isAllowedType, config?.connectionType, lastNotification]);

  // Indicador visual del estado
  const getStatusColorClass = () => {
    if (isConnecting) return styles.connecting;
    if (isConnected) return styles.connected;
    return styles.disconnected;
  };

  const getStatusText = () => {
    if (isConnecting) return 'Conectando...';
    if (isConnected)
      return `Conectado (${config?.connectionType?.toUpperCase() || 'WS'})`;
    return 'Desconectado';
  };

  return (
    <div data-testid="receiver" className={styles.receiverContainer}>
      <span
        className={`${styles.statusIndicator} ${getStatusColorClass()}`}
        title={getStatusText()}
      />
    </div>
  );
};

export default Receiver;
