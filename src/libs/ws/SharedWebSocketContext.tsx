// SharedWebSocketContext.tsx - Contexto que usa Shared Worker
import {
  createContext,
  ReactNode,
  useContext,
} from 'react';
import {
  WebSocketContextValue,
  WebSocketConfig,
} from './types';
import { useSharedWebSocket } from './useSharedWebSocket';

// Context
const SharedWebSocketContext = createContext<WebSocketContextValue | null>(null);

// Props del Provider
interface SharedWebSocketProviderProps {
  children: ReactNode;
  config: WebSocketConfig;
}

// Provider que usa Shared Worker
export function SharedWebSocketProvider({
  children,
  config,
}: SharedWebSocketProviderProps) {
  const contextValue = useSharedWebSocket(config);

  return (
    <SharedWebSocketContext.Provider value={contextValue}>
      {children}
    </SharedWebSocketContext.Provider>
  );
}

// Hook para usar el contexto
export function useWebSocket(): WebSocketContextValue {
  const context = useContext(SharedWebSocketContext);
  if (!context) {
    throw new Error('useWebSocket debe ser usado dentro de SharedWebSocketProvider');
  }
  return context;
}

export { SharedWebSocketContext };
