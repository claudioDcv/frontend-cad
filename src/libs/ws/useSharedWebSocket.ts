// useSharedWebSocket.ts - Hook para comunicarse con el Shared Worker
import { useEffect, useRef, useCallback, useState } from 'react';
import {
  WebSocketContextValue,
  WebSocketConfig,
  WebSocketMessage,
  LogEntry,
  WebSocketStats,
  WebSocketReadyState,
} from './types';

export function useSharedWebSocket(config: WebSocketConfig): WebSocketContextValue {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [readyState, setReadyState] = useState<WebSocketReadyState>(WebSocketReadyState.CLOSED);
  const [stats, setStats] = useState<WebSocketStats>({
    messagesSent: 0,
    messagesReceived: 0,
    connectionAttempts: 0,
    connectionTime: '--',
    isConnected: false,
  });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const workerRef = useRef<SharedWorker | null>(null);
  const portRef = useRef<MessagePort | null>(null);

  // Inicializar el Shared Worker
  useEffect(() => {
    // Crear el worker apuntando al archivo compilado
    workerRef.current = new SharedWorker(
      new URL('./websocket.worker.ts', import.meta.url),
      { type: 'module' }
    );
    
    portRef.current = workerRef.current.port;
    
    // Configurar el listener de mensajes
    portRef.current.onmessage = (event) => {
      const { type, payload } = event.data;
      
      switch (type) {
        case 'state_update':
          if (payload.isConnected !== undefined) setIsConnected(payload.isConnected);
          if (payload.isConnecting !== undefined) setIsConnecting(payload.isConnecting);
          if (payload.stats) setStats(payload.stats);
          if (payload.lastMessage !== undefined) setLastMessage(payload.lastMessage);
          
          // Actualizar readyState basado en el estado de conexión
          if (payload.isConnected) {
            setReadyState(WebSocketReadyState.OPEN);
          } else if (payload.isConnecting) {
            setReadyState(WebSocketReadyState.CONNECTING);
          } else {
            setReadyState(WebSocketReadyState.CLOSED);
          }
          break;
          
        case 'message':
          setLastMessage(payload as WebSocketMessage);
          break;
          
        case 'log':
          setLogs(prev => [...prev, payload as LogEntry].slice(-100));
          break;
          
        case 'error':
          setError(payload as string);
          break;
      }
    };

    portRef.current.onmessageerror = () => {
      setError('Error en la comunicación con el Shared Worker');
    };

    // Iniciar la conexión del puerto
    portRef.current.start();

    // Solicitar el estado actual
    portRef.current.postMessage({ type: 'get_state' });

    return () => {
      if (portRef.current) {
        portRef.current.close();
      }
    };
  }, []);

  // Funciones para comunicarse con el worker
  const connect = useCallback(() => {
    if (portRef.current) {
      portRef.current.postMessage({
        type: 'connect',
        config,
      });
    }
  }, [config]);

  const disconnect = useCallback(() => {
    if (portRef.current) {
      portRef.current.postMessage({ type: 'disconnect' });
    }
  }, []);

  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (portRef.current) {
      portRef.current.postMessage({
        type: 'send',
        payload: message,
      });
    }
  }, []);

  const sendPing = useCallback(() => {
    if (portRef.current) {
      portRef.current.postMessage({ type: 'ping' });
    }
  }, []);

  const subscribe = useCallback((topic: string) => {
    if (portRef.current) {
      portRef.current.postMessage({
        type: 'subscribe',
        payload: topic,
      });
    }
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return {
    isConnected,
    isConnecting,
    readyState,
    stats,
    logs,
    connect,
    disconnect,
    sendMessage,
    sendPing,
    subscribe,
    clearLogs,
    config,
    lastMessage,
    error,
  };
}
