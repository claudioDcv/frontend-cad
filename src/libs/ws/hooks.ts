/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useCallback, useMemo, useContext } from 'react';
import { WebSocketContext } from './WebSocketContext';
import {
  MessageType,
  WebSocketMessage,
  LogType,
  WebSocketContextValue,
} from './types';

/**
 * Hook para manejar reconexión automática
 */
export function useWebSocketAutoReconnect(
  enabled: boolean = true,
  maxAttempts: number = 5,
  delayMs: number = 3000
) {
  const { isConnected, error, connect, stats } = useWebSocket();
  const attemptCountRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const attemptReconnect = useCallback(() => {
    if (!enabled || attemptCountRef.current >= maxAttempts) {
      return;
    }

    attemptCountRef.current++;
    timeoutRef.current = setTimeout(() => {
      connect();
    }, delayMs);
  }, [enabled, maxAttempts, delayMs, connect]);

  useEffect(() => {
    if (isConnected) {
      attemptCountRef.current = 0;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else if (error && enabled && stats.connectionAttempts > 0) {
      attemptReconnect();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isConnected, error, attemptReconnect, enabled, stats.connectionAttempts]);

  return {
    isReconnecting: attemptCountRef.current > 0 && !isConnected,
    reconnectAttempts: attemptCountRef.current,
    maxAttempts,
  };
}

/**
 * Hook para escuchar mensajes específicos
 */
export function useWebSocketMessage<T = any>(
  messageType: MessageType | string,
  onMessage?: (data: T) => void
) {
  const { lastMessage } = useWebSocket();

  useEffect(() => {
    if (lastMessage && lastMessage.type === messageType && onMessage) {
      onMessage(lastMessage.data || lastMessage);
    }
  }, [lastMessage, messageType, onMessage]);

  return lastMessage?.type === messageType ? lastMessage : null;
}

/**
 * Hook para manejar suscripciones a temas
 */
export function useWebSocketSubscription(topics: string | string[]) {
  const { isConnected, subscribe, lastMessage } = useWebSocket();
  const topicsArray = useMemo(
    () => (Array.isArray(topics) ? topics : [topics]),
    [topics]
  );
  const subscribedRef = useRef<Set<string>>(new Set());

  // Suscribirse cuando se conecte
  useEffect(() => {
    if (isConnected) {
      topicsArray.forEach((topic) => {
        if (!subscribedRef.current.has(topic)) {
          subscribe(topic);
          subscribedRef.current.add(topic);
        }
      });
    } else {
      subscribedRef.current.clear();
    }
  }, [isConnected, subscribe, topicsArray]);

  // Filtrar mensajes por tema
  const relevantMessage =
    lastMessage?.topic && topicsArray.includes(lastMessage.topic)
      ? lastMessage
      : null;

  return {
    subscribedTopics: Array.from(subscribedRef.current),
    lastMessage: relevantMessage,
  };
}

/**
 * Hook para logs filtrados
 */
export function useWebSocketLogs(filterType?: LogType, maxLogs: number = 50) {
  const { logs } = useWebSocket();

  const filteredLogs = logs
    .filter((log) => !filterType || log.type === filterType)
    .slice(-maxLogs);

  return filteredLogs;
}

/**
 * Hook para estadísticas en tiempo real
 */
export function useWebSocketStats() {
  const { stats, isConnected, isConnecting } = useWebSocket();

  return {
    ...stats,
    status: isConnecting
      ? 'connecting'
      : isConnected
      ? 'connected'
      : 'disconnected',
  };
}

/**
 * Hook para enviar comandos predefinidos
 */
export function useWebSocketCommands() {
  const { sendMessage, subscribe, isConnected } = useWebSocket();

  const sendCommand = useCallback(
    (type: MessageType, data?: any) => {
      if (!isConnected) {
        console.warn('WebSocket no está conectado');
        return false;
      }

      const message: WebSocketMessage = {
        type,
        timestamp: Date.now(),
        ...data,
      };

      sendMessage(message);
      return true;
    },
    [sendMessage, isConnected]
  );

  return {
    sendCommand,
    sendPing: useCallback(() => sendCommand(MessageType.PING), [sendCommand]),
    subscribe: useCallback((topic: string) => subscribe(topic), [subscribe]),
    sendCustomMessage: useCallback(
      (data: any) => sendCommand(MessageType.NOTIFICATION, { data }),
      [sendCommand]
    ),
  };
}

/**
 * Hook para heartbeat personalizado
 */
export function useWebSocketHeartbeat(
  intervalMs: number = 30000,
  enabled: boolean = true
) {
  const { isConnected, sendPing } = useWebSocket();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (enabled && isConnected && intervalMs > 0) {
      intervalRef.current = setInterval(() => {
        sendPing();
      }, intervalMs);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, isConnected, intervalMs, sendPing]);

  return {
    isHeartbeatActive: !!intervalRef.current,
    intervalMs,
  };
}

// Hook para usar el contexto
export function useWebSocket(): WebSocketContextValue {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}
