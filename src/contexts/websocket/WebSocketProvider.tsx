import React, { createContext, ReactNode, useCallback, useEffect } from 'react';
import useWebSocketHook, { ReadyState } from 'react-use-websocket';
import { 
  WebSocketContextValue, 
  WebSocketConfig, 
  WebSocketMessage, 
  MessageType 
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
  // Construir la URL con el token
  const socketUrl = React.useMemo(() => {
    if (!config.token) return null;
    
    const url = new URL(config.url);
    if (config.token) {
      url.searchParams.set('token', config.token);
    }
    return url.toString();
  }, [config.url, config.token]);

  const {
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocketHook(
    socketUrl,
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
      
      // Configuración de heartbeat
      heartbeat: config.heartbeatInterval ? {
        message: 'ping',
        returnMessage: 'pong',
        timeout: 60000,
        interval: config.heartbeatInterval,
      } : false,
      
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
    !!socketUrl // Solo conectar si tenemos una URL válida
  );

  // Estado derivado
  const isConnected = readyState === ReadyState.OPEN;
  const isConnecting = readyState === ReadyState.CONNECTING;
  
  // Estado de error
  const [error, setError] = React.useState<string | null>(null);

  // Limpiar error cuando se conecta
  useEffect(() => {
    if (isConnected) {
      setError(null);
    }
  }, [isConnected]);

  // Manejar errores
  useEffect(() => {
    if (readyState === ReadyState.CLOSED && !isConnected) {
      setError('Conexión WebSocket cerrada');
    }
  }, [readyState, isConnected]);

  // Función para enviar mensajes
  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (!isConnected) {
      console.warn('[WebSocket] Intentando enviar mensaje sin conexión');
      return;
    }
    
    const messageWithTimestamp = {
      ...message,
      timestamp: Date.now(),
    };
    
    sendJsonMessage(messageWithTimestamp);
  }, [isConnected, sendJsonMessage]);

  // Función para enviar ping
  const sendPing = useCallback(() => {
    sendMessage({
      type: MessageType.PING,
    });
  }, [sendMessage]);

  // Función para suscribirse a un topic
  const subscribe = useCallback((topic: string) => {
    sendMessage({
      type: MessageType.SUBSCRIBE,
      topic,
    });
  }, [sendMessage]);

  const contextValue: WebSocketContextValue = {
    isConnected,
    isConnecting,
    readyState,
    sendMessage,
    sendPing,
    subscribe,
    lastMessage,
    lastJsonMessage: lastJsonMessage as WebSocketMessage | null,
    error,
    config,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
