import { useNotification } from '@/contexts/notification/useNotification';
import { useWebSocket } from '@/contexts/websocket';
import { Notification } from '@/entities/Notification.entity';
import { useEffect, useRef } from 'react';

const Receiver = () => {
  const notificationCtx = useNotification();
  const init = useRef<boolean>(false);
  const { 
    isConnected, 
    isConnecting, 
    lastNotification, 
    lastJsonMessage, 
    subscribe,
    config
  } = useWebSocket();

  // Auto-conectar para WebSocket tradicional (si no es STOMP)
  useEffect(() => {
    if (config?.connectionType === 'websocket' && isConnected && !init.current) {
      init.current = true;
      subscribe('alerts');
    }
  }, [isConnected, subscribe, config?.connectionType]);

  const add = notificationCtx.add;

  // Manejar notificaciones STOMP
  useEffect(() => {
    if (config?.connectionType === 'stomp' && lastNotification) {
      console.log('[Receiver] Nueva notificación STOMP desde /topic/notifications:', lastNotification);
      
      // Verificar si es una notificación válida
      if (lastNotification.contenido || lastNotification.tipo) {
        console.log('[Receiver] Incrementando contador de notificaciones');
        add();
      }
    }
  }, [lastNotification, add, config?.connectionType]);

  // Manejar notificaciones WebSocket tradicional (fallback)
  useEffect(() => {
    if (config?.connectionType === 'websocket' && lastJsonMessage) {
      const notifications = lastJsonMessage?.data as Notification;
      console.log('[Receiver] Nueva notificación WebSocket:', lastJsonMessage);
      
      if (lastJsonMessage?.type === 'notification' && notifications?.entity) {
        add();
      }
    }
  }, [add, lastJsonMessage, config?.connectionType]);

  // Indicador visual del estado
  const getStatusColor = () => {
    if (isConnecting) return 'orange';
    if (isConnected) return 'green';
    return 'red';
  };

  const getStatusText = () => {
    if (isConnecting) return 'Conectando...';
    if (isConnected) return `Conectado (${config?.connectionType?.toUpperCase() || 'WS'})`;
    return 'Desconectado';
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 8, 
      marginLeft: 'auto',
      marginRight: 8 
    }}>
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
