import {
  createContext,
  useReducer,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {
  WebSocketContextValue,
  WebSocketConfig,
  WebSocketMessage,
  LogEntry,
  LogType,
  MessageType,
  WebSocketReadyState,
  WebSocketStats,
} from './types';

// Estado inicial
interface WebSocketState {
  isConnected: boolean;
  isConnecting: boolean;
  readyState: WebSocketReadyState;
  stats: WebSocketStats;
  logs: LogEntry[];
  lastMessage: WebSocketMessage | null;
  error: string | null;
}

const initialState: WebSocketState = {
  isConnected: false,
  isConnecting: false,
  readyState: WebSocketReadyState.CLOSED,
  stats: {
    messagesSent: 0,
    messagesReceived: 0,
    connectionAttempts: 0,
    connectionTime: '--',
    isConnected: false,
  },
  logs: [],
  lastMessage: null,
  error: null,
};

// Acciones del reducer
type WebSocketAction =
  | { type: 'SET_CONNECTING'; payload: boolean }
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'SET_READY_STATE'; payload: WebSocketReadyState }
  | { type: 'INCREMENT_ATTEMPTS' }
  | { type: 'INCREMENT_SENT' }
  | { type: 'INCREMENT_RECEIVED' }
  | { type: 'SET_CONNECTION_TIME'; payload: string }
  | { type: 'ADD_LOG'; payload: LogEntry }
  | { type: 'CLEAR_LOGS' }
  | { type: 'SET_LAST_MESSAGE'; payload: WebSocketMessage }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_STATS' };

// Reducer
function webSocketReducer(
  state: WebSocketState,
  action: WebSocketAction
): WebSocketState {
  switch (action.type) {
    case 'SET_CONNECTING':
      return { ...state, isConnecting: action.payload };
    case 'SET_CONNECTED':
      return {
        ...state,
        isConnected: action.payload,
        stats: { ...state.stats, isConnected: action.payload },
      };
    case 'SET_READY_STATE':
      return { ...state, readyState: action.payload };
    case 'INCREMENT_ATTEMPTS':
      return {
        ...state,
        stats: {
          ...state.stats,
          connectionAttempts: state.stats.connectionAttempts + 1,
        },
      };
    case 'INCREMENT_SENT':
      return {
        ...state,
        stats: { ...state.stats, messagesSent: state.stats.messagesSent + 1 },
      };
    case 'INCREMENT_RECEIVED':
      return {
        ...state,
        stats: {
          ...state.stats,
          messagesReceived: state.stats.messagesReceived + 1,
        },
      };
    case 'SET_CONNECTION_TIME':
      return {
        ...state,
        stats: { ...state.stats, connectionTime: action.payload },
      };
    case 'ADD_LOG':
      return {
        ...state,
        logs: [...state.logs, action.payload].slice(-100), // Mantener solo los últimos 100 logs
      };
    case 'CLEAR_LOGS':
      return { ...state, logs: [] };
    case 'SET_LAST_MESSAGE':
      return { ...state, lastMessage: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET_STATS':
      return {
        ...state,
        stats: {
          messagesSent: 0,
          messagesReceived: 0,
          connectionAttempts: 0,
          connectionTime: '--',
          isConnected: false,
        },
      };
    default:
      return state;
  }
}

// Context
const WebSocketContext = createContext<WebSocketContextValue | null>(null);

// Props del Provider
interface WebSocketProviderProps {
  children: ReactNode;
  config: WebSocketConfig;
}

// Provider
export function WebSocketProvider({
  children,
  config,
}: WebSocketProviderProps) {
  const [state, dispatch] = useReducer(webSocketReducer, initialState);
  const wsRef = useRef<WebSocket | null>(null);
  const connectionStartTimeRef = useRef<number | null>(null);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const connectionTimeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generar ID único para logs
  const generateLogId = useCallback(() => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Función para agregar logs
  const addLog = useCallback(
    (message: string, type: LogType = LogType.INFO) => {
      const logEntry: LogEntry = {
        id: generateLogId(),
        timestamp: new Date(),
        message,
        type,
      };
      dispatch({ type: 'ADD_LOG', payload: logEntry });
    },
    [generateLogId]
  );

  // Función para actualizar el tiempo de conexión
  const updateConnectionTime = useCallback(() => {
    if (connectionStartTimeRef.current && state.isConnected) {
      const elapsed = Math.floor(
        (Date.now() - connectionStartTimeRef.current) / 1000
      );
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      dispatch({ type: 'SET_CONNECTION_TIME', payload: timeString });
    } else {
      dispatch({ type: 'SET_CONNECTION_TIME', payload: '--' });
    }
  }, [state.isConnected]);

  // Función para enviar mensajes
  const sendMessage = useCallback(
    (message: WebSocketMessage) => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        try {
          wsRef.current.send(JSON.stringify(message));
          dispatch({ type: 'INCREMENT_SENT' });

          if (config.debug) {
            addLog(
              `📤 Mensaje enviado: ${JSON.stringify(message)}`,
              LogType.INFO
            );
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Error al enviar mensaje';
          addLog(`❌ Error al enviar mensaje: ${errorMessage}`, LogType.ERROR);
          dispatch({ type: 'SET_ERROR', payload: errorMessage });
        }
      } else {
        addLog('❌ No hay conexión WebSocket activa', LogType.ERROR);
      }
    },
    [addLog, config.debug]
  );

  // Función para enviar ping
  const sendPing = useCallback(() => {
    const pingMessage: WebSocketMessage = {
      type: MessageType.PING,
      timestamp: Date.now(),
    };
    sendMessage(pingMessage);
  }, [sendMessage]);

  // Función para conectar
  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      addLog('Ya existe una conexión activa', LogType.WARNING);
      return;
    }

    dispatch({ type: 'INCREMENT_ATTEMPTS' });
    dispatch({ type: 'SET_CONNECTING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    addLog(
      `🔄 Intento de conexión #${state.stats.connectionAttempts + 1}`,
      LogType.INFO
    );

    try {
      const url = config.token
        ? `${config.url}?token=${config.token}`
        : config.url;

      wsRef.current = new WebSocket(url, config.protocols);

      wsRef.current.onopen = (event: Event) => {
        connectionStartTimeRef.current = Date.now();
        dispatch({ type: 'SET_CONNECTING', payload: false });
        dispatch({ type: 'SET_CONNECTED', payload: true });
        dispatch({
          type: 'SET_READY_STATE',
          payload: WebSocketReadyState.OPEN,
        });

        addLog(
          '✅ Conexión WebSocket establecida exitosamente',
          LogType.SUCCESS
        );
        addLog(`📍 URL: ${(event.target as WebSocket).url}`, LogType.INFO);

        // Iniciar heartbeat si está configurado
        if (config.heartbeatInterval) {
          heartbeatIntervalRef.current = setInterval(() => {
            sendPing();
          }, config.heartbeatInterval);
        }
      };

      wsRef.current.onmessage = (event: MessageEvent) => {
        dispatch({ type: 'INCREMENT_RECEIVED' });

        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          dispatch({ type: 'SET_LAST_MESSAGE', payload: data });

          if (config.debug) {
            addLog(
              `📨 Mensaje recibido: ${JSON.stringify(data, null, 2)}`,
              LogType.SUCCESS
            );
          }

          // Manejar diferentes tipos de mensajes
          switch (data.type) {
            case MessageType.WELCOME:
              addLog(
                `🎉 ¡Bienvenido! Usuario: ${data.userId}`,
                LogType.SUCCESS
              );
              break;
            case MessageType.PONG:
              addLog(`🏓 Pong recibido - Latencia OK`, LogType.SUCCESS);
              break;
            case MessageType.SUBSCRIBED:
              addLog(`📢 Suscrito al tema: ${data.topic}`, LogType.SUCCESS);
              break;
            case MessageType.NOTIFICATION:
              addLog(
                `🔔 Notificación: ${JSON.stringify(data.data)}`,
                LogType.WARNING
              );
              break;
            case MessageType.ERROR:
              addLog(`❌ Error del servidor: ${data.message}`, LogType.ERROR);
              dispatch({
                type: 'SET_ERROR',
                payload: data.message || 'Error desconocido',
              });
              break;
          }
        } catch (e) {
          addLog(`📨 Mensaje (texto plano): ${event.data}`, LogType.INFO);
          console.error(e);
        }
      };

      wsRef.current.onerror = () => {
        addLog(`❌ Error en WebSocket`, LogType.ERROR);
        dispatch({ type: 'SET_ERROR', payload: 'Error de conexión WebSocket' });
      };

      wsRef.current.onclose = (event: CloseEvent) => {
        connectionStartTimeRef.current = null;
        dispatch({ type: 'SET_CONNECTING', payload: false });
        dispatch({ type: 'SET_CONNECTED', payload: false });
        dispatch({
          type: 'SET_READY_STATE',
          payload: WebSocketReadyState.CLOSED,
        });

        // Limpiar intervals
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
          heartbeatIntervalRef.current = null;
        }

        addLog(
          `🔌 Conexión cerrada - Código: ${event.code}, Razón: ${
            event.reason || 'No especificada'
          }`,
          LogType.WARNING
        );

        // Códigos de estado comunes
        switch (event.code) {
          case 1000:
            addLog('ℹ️ Cierre normal', LogType.INFO);
            break;
          case 1006:
            addLog('⚠️ Conexión cerrada anormalmente', LogType.WARNING);
            break;
          case 1011:
            addLog('❌ Error del servidor', LogType.ERROR);
            break;
          default:
            addLog(`❓ Código de cierre: ${event.code}`, LogType.WARNING);
        }
      };

      dispatch({
        type: 'SET_READY_STATE',
        payload: WebSocketReadyState.CONNECTING,
      });
    } catch (error) {
      dispatch({ type: 'SET_CONNECTING', payload: false });
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      addLog(`❌ Error al crear WebSocket: ${errorMessage}`, LogType.ERROR);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  }, [
    addLog,
    state.stats.connectionAttempts,
    config.token,
    config.url,
    config.protocols,
    config.heartbeatInterval,
    config.debug,
    sendPing,
  ]);

  // Función para desconectar
  const disconnect = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.close(1000, 'Desconectado por el usuario');
      addLog('🔌 Desconectando por solicitud del usuario...', LogType.INFO);
    }
  }, [addLog]);

  // Función para suscribirse
  const subscribe = useCallback(
    (topic: string) => {
      const subscribeMessage: WebSocketMessage = {
        type: MessageType.SUBSCRIBE,
        topic,
        timestamp: Date.now(),
      };
      sendMessage(subscribeMessage);
    },
    [sendMessage]
  );

  // Función para limpiar logs
  const clearLogs = useCallback(() => {
    dispatch({ type: 'CLEAR_LOGS' });
    addLog('🧹 Log limpiado', LogType.INFO);
  }, [addLog]);

  // Efecto para actualizar el tiempo de conexión
  useEffect(() => {
    connectionTimeIntervalRef.current = setInterval(updateConnectionTime, 1000);

    return () => {
      if (connectionTimeIntervalRef.current) {
        clearInterval(connectionTimeIntervalRef.current);
      }
    };
  }, [updateConnectionTime]);

  // Efecto de limpieza al desmontar
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
      if (connectionTimeIntervalRef.current) {
        clearInterval(connectionTimeIntervalRef.current);
      }
    };
  }, []);

  // Log inicial
  useEffect(() => {
    addLog('🚀 Cliente WebSocket iniciado', LogType.INFO);
    addLog('💡 Usa connect() para establecer la conexión', LogType.INFO);
  }, [addLog]);

  const contextValue: WebSocketContextValue = {
    isConnected: state.isConnected,
    isConnecting: state.isConnecting,
    readyState: state.readyState,
    stats: state.stats,
    logs: state.logs,
    connect,
    disconnect,
    sendMessage,
    sendPing,
    subscribe,
    clearLogs,
    config,
    lastMessage: state.lastMessage,
    error: state.error,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
}

export { WebSocketContext };
