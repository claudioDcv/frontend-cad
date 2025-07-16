// Exportar tipos
export * from './types';

// Exportar Context y Provider (implementación original)
export { WebSocketProvider, WebSocketContext } from './WebSocketContext';

// Exportar Context y Provider con Shared Worker
export { SharedWebSocketProvider, SharedWebSocketContext, useWebSocket as useSharedWebSocket } from './SharedWebSocketContext';

// Exportar hooks (implementación original)
export {
  useWebSocketAutoReconnect,
  useWebSocketMessage,
  useWebSocketSubscription,
  useWebSocketLogs,
  useWebSocketStats,
  useWebSocketCommands,
  useWebSocketHeartbeat,
  useWebSocket,
} from './hooks';

// Exportar hooks para Shared Worker
export {
  useSharedWebSocketAutoReconnect,
  useSharedWebSocketMessage,
  useSharedWebSocketSubscription,
  useSharedWebSocketLogs,
  useSharedWebSocketStats,
  useSharedWebSocketCommands,
  useSharedWebSocketHeartbeat,
} from './sharedHooks';

// Exportar utilidades
export {
  WebSocketMessageBuilder,
  WebSocketUrlBuilder,
  LogFormatter,
  WebSocketConfigValidator,
  BrowserCapabilities,
  WebSocketPerformanceMonitor,
  WebSocketDebugger,
} from './utils';
