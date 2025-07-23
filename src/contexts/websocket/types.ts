import { ReadyState } from 'react-use-websocket';

// Tipos para los mensajes WebSocket - Mantenemos compatibilidad pero agregamos STOMP
export enum MessageType {
  WELCOME = 'welcome',
  SUBSCRIBED = 'subscribed',
  NOTIFICATION = 'notification',
  ERROR = 'error',
  SUBSCRIBE = 'subscribe',
}

export interface WebSocketMessage {
  type: MessageType;
  timestamp?: number;
  userId?: string;
  topic?: string;
  data?: unknown;
  message?: string;
}

// Nuevos tipos para STOMP
export interface StompNotification {
  contenido?: string;
  tipo?: string;
  importante?: boolean;
  timestamp?: string;
  [key: string]: unknown;
}

export interface WebSocketConfig {
  url: string;
  token?: string;
  protocols?: string | string[];
  reconnectAttempts?: number;
  reconnectInterval?: number;
  heartbeatInterval?: number;
  debug?: boolean;
  // Nuevo: tipo de conexión
  connectionType?: 'websocket' | 'stomp';
}

export interface WebSocketContextValue {
  // Estado de conexión
  isConnected: boolean;
  isConnecting: boolean;
  readyState: ReadyState;
  
  // Acciones - mantener compatibilidad
  sendMessage: (message: WebSocketMessage) => void;
  subscribe: (topic: string) => void;
  
  // Nuevas acciones STOMP
  sendNotification?: (notification: StompNotification) => void;
  sendPing?: () => void;
  
  // Último mensaje recibido
  lastMessage: MessageEvent<string> | null;
  lastJsonMessage: WebSocketMessage | null;
  lastNotification?: StompNotification | null;
  
  // Error
  error: string | null;
  
  // Configuración
  config: WebSocketConfig | null;
  
  // Stats
  reconnectAttempts?: number;
}
