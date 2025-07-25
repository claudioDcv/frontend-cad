import { useCallback } from 'react';
import { useWebSocket } from '../contexts/websocket';
import { StompNotification } from '../contexts/websocket/types';

export interface UseStompNotificationsReturn {
  isConnected: boolean;
  isConnecting: boolean;
  lastNotification: StompNotification | null;
  sendNotification: (notification: Partial<StompNotification>) => void;
  sendPing: () => void;
  error: string | null;
  reconnectAttempts: number;
}

/**
 * Hook específico para manejar notificaciones STOMP
 * Proporciona una interfaz simplificada para enviar y recibir notificaciones
 */
export const useStompNotifications = (): UseStompNotificationsReturn => {
  const {
    isConnected,
    isConnecting,
    lastNotification,
    sendNotification: contextSendNotification,
    sendPing: contextSendPing,
    error,
    reconnectAttempts = 0,
    config,
  } = useWebSocket();

  const sendNotification = useCallback(
    (notification: Partial<StompNotification>) => {
      if (config?.connectionType !== 'stomp') {
        console.warn('[useStompNotifications] Solo disponible en modo STOMP');
        return;
      }

      if (!contextSendNotification) {
        console.warn('[useStompNotifications] sendNotification no disponible');
        return;
      }

      // Agregar valores por defecto
      const notificationWithDefaults: StompNotification = {
        type: notification.type || 'default',
        payload: notification.payload,
      };

      contextSendNotification(notificationWithDefaults);
    },
    [contextSendNotification, config?.connectionType]
  );

  const sendPing = useCallback(() => {
    if (config?.connectionType !== 'stomp') {
      console.warn('[useStompNotifications] Solo disponible en modo STOMP');
      return;
    }

    if (!contextSendPing) {
      console.warn('[useStompNotifications] sendPing no disponible');
      return;
    }

    contextSendPing();
  }, [contextSendPing, config?.connectionType]);

  return {
    isConnected,
    isConnecting,
    lastNotification: lastNotification || null,
    sendNotification,
    sendPing,
    error,
    reconnectAttempts,
  };
};
