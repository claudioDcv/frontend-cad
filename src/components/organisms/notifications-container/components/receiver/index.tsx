import { useEffect } from 'react';
import { useNotification } from '@/contexts/notification/useNotification';
import { useWebSocket } from '@/contexts/websocket';
import useAllowedNotificationType from '@/hooks/useAllowedNotificationType';

const Receiver = () => {
  const { isAllowedType } = useAllowedNotificationType();
  const notificationCtx = useNotification();
  const {
    isConnected,
    isConnecting,
    lastNotification,
    config,
  } = useWebSocket();

  const add = notificationCtx.add;

  // Manejar notificaciones STOMP
  useEffect(() => {
    if (config?.connectionType === 'stomp' && lastNotification) {
      // Verificar si es una notificación válida
      if (isAllowedType(lastNotification.type)) {
        add();
      }
    }
  }, [add, isAllowedType, config?.connectionType, lastNotification]);

  // Indicador visual del estado
  const getStatusColor = () => {
    if (isConnecting) return 'orange';
    if (isConnected) return 'green';
    return 'red';
  };

  const getStatusText = () => {
    if (isConnecting) return 'Conectando...';
    if (isConnected)
      return `Conectado (${config?.connectionType?.toUpperCase() || 'WS'})`;
    return 'Desconectado';
  };

  return (
    <div
      data-testid="receiver"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginLeft: 'auto',
        marginRight: 8,
      }}
    >
      <span
        style={{
          width: 15,
          height: 15,
          borderRadius: '50%',
          backgroundColor: getStatusColor(),
        }}
        title={getStatusText()}
      />
    </div>
  );
};

export default Receiver;
