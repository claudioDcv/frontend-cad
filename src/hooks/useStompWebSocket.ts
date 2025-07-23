import { useState, useEffect, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export interface StompMessage {
  contenido?: string;
  tipo?: string;
  importante?: boolean;
  timestamp?: string;
  [key: string]: unknown;
}

export interface StompConfig {
  url: string;
  token: string;
  debug?: boolean;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
}

export interface StompConnection {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  connect: () => void;
  disconnect: () => void;
  sendNotification: (notification: StompMessage) => void;
  sendPing: () => void;
  lastNotification: StompMessage | null;
  reconnectAttempts: number;
}

export const useStompWebSocket = (config: StompConfig): StompConnection => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastNotification, setLastNotification] = useState<StompMessage | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const stompClientRef = useRef<Client | null>(null);
  const userTokenRef = useRef<string>(config.token);

  // Actualizar token cuando cambie
  useEffect(() => {
    userTokenRef.current = config.token;
  }, [config.token]);

  const addDebugMessage = useCallback((message: string, type: 'info' | 'error' | 'success' = 'info') => {
    if (config.debug) {
      console.log(`[STOMP ${type.toUpperCase()}]: ${message}`);
    }
  }, [config.debug]);

  const validateJWT = useCallback((token: string): boolean => {
    if (!token) return false;
    const jwtParts = token.split('.');
    if (jwtParts.length !== 3) return false;
    
    try {
      const payload = JSON.parse(atob(jwtParts[1]));
      addDebugMessage(`Token parseado - Usuario: ${payload.sub || 'N/A'}, Nombre: ${payload.nombre || 'N/A'} ${payload.apellido || 'N/A'}`);
      return true;
    } catch {
      addDebugMessage("No se pudo parsear la información del token, pero intentando conectar...", 'error');
      return true; // Continuar de todos modos
    }
  }, [addDebugMessage]);

  const subscribeToTopics = useCallback(() => {
    const client = stompClientRef.current;
    if (!client || !isConnected) {
      addDebugMessage("No hay conexión STOMP activa", 'error');
      return;
    }

    try {
      // Suscribirse al tópico principal de notificaciones
      client.subscribe('/topic/notifications', (message) => {
        try {
          const notification: StompMessage = JSON.parse(message.body);
          addDebugMessage(`📢 NOTIFICACIÓN recibida: ${JSON.stringify(notification, null, 2)}`, 'success');
          setLastNotification(notification);
        } catch (error) {
          addDebugMessage(`Error parseando notificación: ${error}`, 'error');
        }
      });

      // Suscribirse a mensajes de pong personales
      client.subscribe('/user/queue/pong', (message) => {
        try {
          const pong = JSON.parse(message.body);
          addDebugMessage(`🏓 PONG recibido: ${JSON.stringify(pong, null, 2)}`, 'success');
        } catch (error) {
          addDebugMessage(`Error parseando pong: ${error}`, 'error');
        }
      });

      addDebugMessage('📡 Suscrito a /topic/notifications y /user/queue/pong', 'success');
    } catch (error) {
      addDebugMessage(`Error en suscripciones: ${error}`, 'error');
    }
  }, [isConnected, addDebugMessage]);

  const connect = useCallback(() => {
    if (isConnected || isConnecting) {
      addDebugMessage("Ya está conectado o conectando", 'info');
      return;
    }

    const token = userTokenRef.current;
    if (!token) {
      setError("Token JWT requerido");
      addDebugMessage("Token JWT requerido", 'error');
      return;
    }

    if (!validateJWT(token)) {
      setError("Token JWT inválido");
      addDebugMessage("Token JWT inválido", 'error');
      return;
    }

    setIsConnecting(true);
    setError(null);
    addDebugMessage(`🔄 Intentando conectar con token: ${token.substring(0, 20)}...`);

    try {
      // Crear socket SockJS
      const socket = new SockJS(config.url);
      
      // Crear cliente STOMP
      const client = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          'Authorization': `Bearer ${token}`
        },
        debug: config.debug ? (str) => console.log('STOMP Debug:', str) : undefined,
        reconnectDelay: 5000,
        heartbeatIncoming: config.heartbeatInterval || 30000,
        heartbeatOutgoing: config.heartbeatInterval || 30000,
      });

      // Configurar callbacks
      client.onConnect = (frame) => {
        addDebugMessage('✅ Conectado exitosamente al servidor STOMP', 'success');
        addDebugMessage(`📋 Frame de conexión: ${frame}`, 'info');
        
        setIsConnected(true);
        setIsConnecting(false);
        setError(null);
        setReconnectAttempts(0);
        
        // Auto-suscribirse a los tópicos
        subscribeToTopics();
      };

      client.onStompError = (frame) => {
        const errorMsg = `Error STOMP: ${frame.headers['message']} - ${frame.body}`;
        addDebugMessage(errorMsg, 'error');
        setError(errorMsg);
        setIsConnected(false);
        setIsConnecting(false);
      };

      client.onWebSocketError = (error) => {
        const errorMsg = `Error WebSocket: ${error}`;
        addDebugMessage(errorMsg, 'error');
        setError(errorMsg);
        setIsConnected(false);
        setIsConnecting(false);
      };

      client.onDisconnect = () => {
        addDebugMessage('🔌 Desconectado del servidor', 'info');
        setIsConnected(false);
        setIsConnecting(false);
      };

      client.onWebSocketClose = (event) => {
        addDebugMessage(`WebSocket cerrado: ${event.code} - ${event.reason}`, 'info');
        setIsConnected(false);
        setIsConnecting(false);
        
        // Intentar reconexión automática si no fue intencional
        if (event.code !== 1000 && reconnectAttempts < (config.maxReconnectAttempts || 5)) {
          setReconnectAttempts(prev => prev + 1);
          setTimeout(() => {
            addDebugMessage(`🔄 Reintentando conexión (intento ${reconnectAttempts + 1})`, 'info');
            connect();
          }, 5000);
        }
      };

      stompClientRef.current = client;
      client.activate();

    } catch (error) {
      const errorMsg = `Error iniciando conexión: ${error}`;
      addDebugMessage(errorMsg, 'error');
      setError(errorMsg);
      setIsConnecting(false);
    }
  }, [isConnected, isConnecting, config, validateJWT, subscribeToTopics, addDebugMessage, reconnectAttempts]);

  const disconnect = useCallback(() => {
    const client = stompClientRef.current;
    if (client && client.connected) {
      client.deactivate();
      addDebugMessage('🔌 Desconectando del servidor', 'info');
    }
    
    stompClientRef.current = null;
    setIsConnected(false);
    setIsConnecting(false);
    setError(null);
    setReconnectAttempts(0);
  }, [addDebugMessage]);

  const sendNotification = useCallback((notification: StompMessage) => {
    const client = stompClientRef.current;
    if (!client || !isConnected) {
      addDebugMessage("❌ No hay conexión activa", 'error');
      return;
    }

    try {
      const notificationWithDefaults = {
        contenido: notification.contenido || '',
        tipo: notification.tipo || 'GENERAL',
        importante: notification.importante || false,
        timestamp: notification.timestamp || new Date().toISOString(),
        ...notification
      };

      client.publish({
        destination: '/app/notification',
        body: JSON.stringify(notificationWithDefaults)
      });

      addDebugMessage(`📤 Notificación enviada: "${notificationWithDefaults.contenido}"`, 'success');
    } catch (error) {
      addDebugMessage(`❌ Error enviando notificación: ${error}`, 'error');
    }
  }, [isConnected, addDebugMessage]);

  const sendPing = useCallback(() => {
    const client = stompClientRef.current;
    if (!client || !isConnected) {
      addDebugMessage("❌ No hay conexión activa", 'error');
      return;
    }

    try {
      const pingMessage = {
        type: 'ping',
        timestamp: new Date().toISOString()
      };

      client.publish({
        destination: '/app/ping',
        body: JSON.stringify(pingMessage)
      });

      addDebugMessage('🏓 Ping enviado', 'info');
    } catch (error) {
      addDebugMessage(`❌ Error enviando ping: ${error}`, 'error');
    }
  }, [isConnected, addDebugMessage]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  // Auto-conectar cuando cambie el token (si es válido)
  useEffect(() => {
    if (config.token && !isConnected && !isConnecting) {
      // Pequeño delay para evitar conexiones múltiples
      const timer = setTimeout(() => {
        connect();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [config.token, isConnected, isConnecting, connect]);

  return {
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    sendNotification,
    sendPing,
    lastNotification,
    reconnectAttempts
  };
};
