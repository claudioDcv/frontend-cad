export enum WebSocketReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

export enum MessageType {
  WELCOME = 'welcome',
  PONG = 'pong',
  SUBSCRIBED = 'subscribed',
  NOTIFICATION = 'notification',
  ERROR = 'error',
  PING = 'ping',
  SUBSCRIBE = 'subscribe',
}

export enum LogType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export interface WebSocketMessage {
  type: MessageType;
  timestamp?: number;
  userId?: string;
  topic?: string;
  data?: any;
  message?: string;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  message: string;
  type: LogType;
}

export interface WebSocketStats {
  messagesSent: number;
  messagesReceived: number;
  connectionAttempts: number;
  connectionTime: string;
  isConnected: boolean;
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
  readyState: WebSocketReadyState;
  
  // Estadísticas
  stats: WebSocketStats;
  
  // Logs
  logs: LogEntry[];
  
  // Acciones
  connect: () => void;
  disconnect: () => void;
  sendMessage: (message: WebSocketMessage) => void;
  sendPing: () => void;
  subscribe: (topic: string) => void;
  clearLogs: () => void;
  
  // Configuración
  config: WebSocketConfig | null;
  
  // Último mensaje recibido
  lastMessage: WebSocketMessage | null;
  
  // Error
  error: string | null;
}
