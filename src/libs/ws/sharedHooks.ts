// sharedHooks.ts - Hooks específicos para Shared WebSocket
import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useWebSocket as useSharedWebSocket } from './SharedWebSocketContext';
import {
  MessageType,
  WebSocketMessage,
  LogType,
} from './types';

/**
 * Hook para manejar reconexión automática con Shared Worker
 */
export function useSharedWebSocketAutoReconnect(
  enabled: boolean = true,
  maxAttempts: number = 5,
  delayMs: number = 3000
) {
  const { isConnected, error, connect, stats } = useSharedWebSocket();
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
 * Hook para escuchar mensajes específicos con Shared Worker
 */
export function useSharedWebSocketMessage<T = unknown>(
  messageType: MessageType | string,
  onMessage?: (data: T) => void
) {
  const { lastMessage } = useSharedWebSocket();

  useEffect(() => {
    if (lastMessage && lastMessage.type === messageType && onMessage) {
      onMessage(lastMessage.data || lastMessage);
    }
  }, [lastMessage, messageType, onMessage]);

  return lastMessage?.type === messageType ? lastMessage : null;
}

/**
 * Hook para manejar suscripciones a temas con Shared Worker
 */
export function useSharedWebSocketSubscription(topics: string | string[]) {
  const { isConnected, subscribe, lastMessage } = useSharedWebSocket();
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
 * Hook para logs filtrados con Shared Worker
 */
export function useSharedWebSocketLogs(filterType?: LogType, maxLogs: number = 50) {
  const { logs } = useSharedWebSocket();

  const filteredLogs = logs
    .filter((log) => !filterType || log.type === filterType)
    .slice(-maxLogs);

  return filteredLogs;
}

/**
 * Hook para estadísticas en tiempo real con Shared Worker
 */
export function useSharedWebSocketStats() {
  const { stats, isConnected, isConnecting } = useSharedWebSocket();

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
 * Hook para enviar comandos predefinidos con Shared Worker
 */
export function useSharedWebSocketCommands() {
  const { sendMessage, subscribe, isConnected } = useSharedWebSocket();

  const sendCommand = useCallback(
    (type: MessageType, data?: Record<string, unknown>) => {
      if (!isConnected) {
        console.warn('WebSocket no está conectado');
        return false;
      }

      const message: WebSocketMessage = {
        type,
        timestamp: Date.now(),
        ...(data || {}),
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
      (data: unknown) => sendCommand(MessageType.NOTIFICATION, { data }),
      [sendCommand]
    ),
  };
}

/**
 * Hook para heartbeat personalizado con Shared Worker
 */
export function useSharedWebSocketHeartbeat(
  intervalMs: number = 30000,
  enabled: boolean = true
) {
  const { isConnected, sendPing } = useSharedWebSocket();
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
