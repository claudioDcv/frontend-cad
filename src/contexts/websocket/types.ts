import { ReadyState } from 'react-use-websocket';

// Tipos para los mensajes WebSocket
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

export interface WebSocketConfig {
  url: string;
  token?: string;
  protocols?: string | string[];
  reconnectAttempts?: number;
  reconnectInterval?: number;
  heartbeatInterval?: number;
  debug?: boolean;
}

export interface WebSocketContextValue {
  // Estado de conexión
  isConnected: boolean;
  isConnecting: boolean;
  readyState: ReadyState;
  
  // Acciones
  sendMessage: (message: WebSocketMessage) => void;
  subscribe: (topic: string) => void;
  
  // Último mensaje recibido
  lastMessage: MessageEvent<string> | null;
  lastJsonMessage: WebSocketMessage | null;
  
  // Error
  error: string | null;
  
  // Configuración
  config: WebSocketConfig | null;
}
