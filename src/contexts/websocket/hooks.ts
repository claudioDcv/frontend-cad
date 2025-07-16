import { useEffect, useState, useCallback, useMemo } from 'react';
import { useWebSocket } from './useWebSocket';
import { WebSocketMessage, MessageType } from './types';

// Hook para auto-reconexión con configuración avanzada
export const useWebSocketAutoReconnect = (
  enabled: boolean = true,
  maxAttempts: number = 10,
  backoffDelay: number = 1000
) => {
  const { isConnected, error } = useWebSocket();
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [isReconnecting, setIsReconnecting] = useState(false);

  useEffect(() => {
    if (!enabled || isConnected) {
      setReconnectAttempts(0);
      setIsReconnecting(false);
      return;
    }

    if (error && reconnectAttempts < maxAttempts) {
      setIsReconnecting(true);
      const delay = Math.min(backoffDelay * Math.pow(2, reconnectAttempts), 30000);
      
      const timeoutId = setTimeout(() => {
        setReconnectAttempts(prev => prev + 1);
        setIsReconnecting(false);
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [enabled, error, isConnected, reconnectAttempts, maxAttempts, backoffDelay]);

  return {
    isReconnecting,
    reconnectAttempts,
    maxAttempts,
  };
};

// Hook para filtrar mensajes por tipo
export const useWebSocketMessage = <T = unknown>(
  messageType?: MessageType,
  transform?: (data: unknown) => T
) => {
  const { lastJsonMessage } = useWebSocket();
  const [filteredMessage, setFilteredMessage] = useState<T | null>(null);

  useEffect(() => {
    if (!lastJsonMessage) return;

    if (!messageType || lastJsonMessage.type === messageType) {
      const data = transform 
        ? transform(lastJsonMessage.data)
        : (lastJsonMessage.data as T);
      setFilteredMessage(data);
    }
  }, [lastJsonMessage, messageType, transform]);

  return filteredMessage;
};

// Hook para suscribirse a múltiples topics
export const useWebSocketSubscription = (
  topics: string | string[]
) => {
  const { isConnected, subscribe } = useWebSocket();
  const [subscribedTopics, setSubscribedTopics] = useState<string[]>([]);

  const topicsArray = useMemo(() => 
    Array.isArray(topics) ? topics : [topics], 
    [topics]
  );
  const topicsKey = topicsArray.join(',');

  useEffect(() => {
    if (!isConnected) return;

    const newTopics = topicsArray.filter(
      topic => !subscribedTopics.includes(topic)
    );

    if (newTopics.length > 0) {
      newTopics.forEach(topic => subscribe(topic));
      setSubscribedTopics(prev => [...prev, ...newTopics]);
    }
  }, [isConnected, topicsKey, subscribe, subscribedTopics, topicsArray]);

  return { subscribedTopics };
};

// Hook para comandos WebSocket con queue
export const useWebSocketCommands = () => {
  const { sendMessage, isConnected } = useWebSocket();
  const [messageQueue, setMessageQueue] = useState<WebSocketMessage[]>([]);

  // Procesar cola cuando se conecta
  useEffect(() => {
    if (isConnected && messageQueue.length > 0) {
      messageQueue.forEach(message => sendMessage(message));
      setMessageQueue([]);
    }
  }, [isConnected, messageQueue, sendMessage]);

  const sendCommand = useCallback((message: WebSocketMessage) => {
    if (isConnected) {
      sendMessage(message);
    } else {
      // Agregar a la cola si no está conectado
      setMessageQueue(prev => [...prev, message]);
    }
  }, [isConnected, sendMessage]);

  const clearQueue = useCallback(() => {
    setMessageQueue([]);
  }, []);

  return {
    sendCommand,
    clearQueue,
    queueSize: messageQueue.length,
    isConnected,
  };
};

// Hook para estadísticas de conexión
export const useWebSocketStats = () => {
  const { isConnected, isConnecting, readyState, lastMessage, error } = useWebSocket();
  const [stats, setStats] = useState({
    messagesReceived: 0,
    connectionTime: null as Date | null,
    lastMessageTime: null as Date | null,
    errorCount: 0,
  });

  // Contar mensajes recibidos
  useEffect(() => {
    if (lastMessage) {
      setStats(prev => ({
        ...prev,
        messagesReceived: prev.messagesReceived + 1,
        lastMessageTime: new Date(),
      }));
    }
  }, [lastMessage]);

  // Registrar tiempo de conexión
  useEffect(() => {
    if (isConnected && !stats.connectionTime) {
      setStats(prev => ({
        ...prev,
        connectionTime: new Date(),
      }));
    } else if (!isConnected && stats.connectionTime) {
      setStats(prev => ({
        ...prev,
        connectionTime: null,
      }));
    }
  }, [isConnected, stats.connectionTime]);

  // Contar errores
  useEffect(() => {
    if (error) {
      setStats(prev => ({
        ...prev,
        errorCount: prev.errorCount + 1,
      }));
    }
  }, [error]);

  return {
    ...stats,
    isConnected,
    isConnecting,
    readyState,
    uptime: stats.connectionTime 
      ? Date.now() - stats.connectionTime.getTime() 
      : 0,
  };
};
