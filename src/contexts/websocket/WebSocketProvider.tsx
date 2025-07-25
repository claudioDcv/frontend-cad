import React, { createContext, ReactNode, useCallback, useEffect, useMemo } from 'react';
import useWebSocketHook, { ReadyState } from 'react-use-websocket';
import { useStompWebSocket } from '../../hooks/useStompWebSocket';
import { 
  WebSocketContextValue, 
  WebSocketConfig, 
  WebSocketMessage, 
  MessageType,
  StompNotification
} from './types';

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

export { WebSocketContext };

interface WebSocketProviderProps {
  children: ReactNode;
  config: WebSocketConfig;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ 
  children, 
  config 
}) => {
  // Determinar el tipo de conexión basado en la URL o configuración
  const connectionType = useMemo(() => {
    return config.connectionType || 
           (config.url.includes('/ws/notifications') ? 'stomp' : 'websocket');
  }, [config.connectionType, config.url]);

  // Hook STOMP - solo se usa si connectionType es 'stomp'
  const stompConnection = useStompWebSocket({
    url: config.url,
    token: config.token || '',
    debug: config.debug,
    maxReconnectAttempts: config.reconnectAttempts,
    heartbeatInterval: config.heartbeatInterval
  });

  // Construir la URL para WebSocket tradicional (fallback)
  const socketUrl = React.useMemo(() => {
    if (connectionType === 'stomp' || !config.token) return null;
    
    const url = new URL(config.url);
    if (config.token) {
      url.searchParams.set('token', config.token);
    }
    return url.toString();
  }, [config.url, config.token, connectionType]);

  // Hook WebSocket tradicional - solo se usa si connectionType es 'websocket'
  const {
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocketHook(
    connectionType === 'websocket' ? socketUrl : null,
    {
      // Habilitar compartir conexión entre pestañas
      share: true,
      
      // Configuración de reconexión
      shouldReconnect: (closeEvent: CloseEvent) => {
        // Reconectar automáticamente a menos que sea un cierre intencional
        return closeEvent.code !== 1000;
      },
      reconnectAttempts: config.reconnectAttempts || 10,
      reconnectInterval: config.reconnectInterval || 5000,
      
      // Protocolos
      protocols: config.protocols,
      
      // Event handlers
      onOpen: (event: Event) => {
        if (config.debug) {
          console.log('[WebSocket] Conexión abierta:', event);
        }
      },
      
      onClose: (event: CloseEvent) => {
        if (config.debug) {
          console.log('[WebSocket] Conexión cerrada:', event);
        }
      },
      
      onError: (event: Event) => {
        if (config.debug) {
          console.error('[WebSocket] Error:', event);
        }
      },
      
      onMessage: (event: MessageEvent) => {
        if (config.debug) {
          console.log('[WebSocket] Mensaje recibido:', event);
        }
      },
      
      // Filtro para procesar solo mensajes válidos
      filter: (message: MessageEvent) => {
        try {
          const data = JSON.parse(message.data);
          return data && typeof data === 'object';
        } catch {
          return false;
        }
      },
    },
    connectionType === 'websocket' && !!socketUrl // Solo conectar si es websocket y tenemos URL
  );

  // Estados derivados según el tipo de conexión
  const isConnected = useMemo(() => {
    return connectionType === 'stomp' 
      ? stompConnection.isConnected 
      : readyState === ReadyState.OPEN;
  }, [connectionType, stompConnection.isConnected, readyState]);

  const isConnecting = useMemo(() => {
    return connectionType === 'stomp' 
      ? stompConnection.isConnecting 
      : readyState === ReadyState.CONNECTING;
  }, [connectionType, stompConnection.isConnecting, readyState]);

  const error = useMemo(() => {
    if (connectionType === 'stomp') {
      return stompConnection.error;
    }
    return readyState === ReadyState.CLOSED && !isConnected ? 'Conexión WebSocket cerrada' : null;
  }, [connectionType, stompConnection.error, readyState, isConnected]);

  // Función para enviar mensajes WebSocket tradicional
  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (connectionType === 'stomp') {
      console.warn('[WebSocket] sendMessage no soportado en modo STOMP, usa sendNotification');
      return;
    }

    if (!isConnected) {
      console.warn('[WebSocket] Intentando enviar mensaje sin conexión');
      return;
    }
    
    const messageWithTimestamp = {
      ...message,
      timestamp: Date.now(),
    };
    
    sendJsonMessage(messageWithTimestamp);
  }, [connectionType, isConnected, sendJsonMessage]);

  // Función para suscribirse a un topic (WebSocket tradicional)
  const subscribe = useCallback((topic: string) => {
    if (connectionType === 'stomp') {
      console.warn('[WebSocket] subscribe automático en modo STOMP');
      return;
    }

    sendMessage({
      type: MessageType.SUBSCRIBE,
      topic,
    });
  }, [connectionType, sendMessage]);

  // Función para enviar notificaciones STOMP
  const sendNotification = useCallback((notification: StompNotification) => {
    if (connectionType !== 'stomp') {
      console.warn('[WebSocket] sendNotification solo disponible en modo STOMP');
      return;
    }
    stompConnection.sendNotification(notification);
  }, [connectionType, stompConnection]);

  // Función para enviar ping STOMP
  const sendPing = useCallback(() => {
    if (connectionType !== 'stomp') {
      console.warn('[WebSocket] sendPing solo disponible en modo STOMP');
      return;
    }
    stompConnection.sendPing();
  }, [connectionType, stompConnection]);

  // Logs de debug
  useEffect(() => {
    if (config.debug) {
      console.log(`[WebSocket] Modo de conexión: ${connectionType}`);
      console.log(`[WebSocket] Estado conectado: ${isConnected}`);
      console.log(`[WebSocket] Estado conectando: ${isConnecting}`);
    }
  }, [connectionType, isConnected, isConnecting, config.debug]);

  const contextValue: WebSocketContextValue = {
    isConnected,
    isConnecting,
    readyState: connectionType === 'stomp' 
      ? (isConnected ? ReadyState.OPEN : isConnecting ? ReadyState.CONNECTING : ReadyState.CLOSED)
      : readyState,
    sendMessage,
    subscribe,
    sendNotification: connectionType === 'stomp' ? sendNotification : undefined,
    sendPing: connectionType === 'stomp' ? sendPing : undefined,
    lastMessage: connectionType === 'websocket' ? lastMessage : null,
    lastJsonMessage: connectionType === 'websocket' ? lastJsonMessage as WebSocketMessage | null : null,
    lastNotification: connectionType === 'stomp' ? stompConnection.lastNotification : undefined,
    error,
    config: {
      ...config,
      connectionType
    },
    reconnectAttempts: connectionType === 'stomp' ? stompConnection.reconnectAttempts : undefined,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
