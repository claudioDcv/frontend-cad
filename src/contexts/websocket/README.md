# WebSocket Implementation with react-use-websocket

Esta implementación utiliza `react-use-websocket` para proporcionar una experiencia WebSocket robusta que soporta:

## ✨ Características

- **Compartir conexión entre pestañas** - Una sola conexión WebSocket compartida entre todas las pestañas del navegador
- **Reconexión automática** - Reconecta automáticamente cuando se pierde la conexión
- **Heartbeat automático** - Ping/pong automático para mantener la conexión viva
- **Cola de mensajes** - Los mensajes se encolan cuando no hay conexión y se envían al reconectar
- **Hooks especializados** - Hooks para casos de uso específicos
- **TypeScript completo** - Tipado completo para mejor experiencia de desarrollo

## 🚀 Uso Básico

### 1. Configurar el Provider

```tsx
import { WebSocketProvider } from '@/contexts/websocket';

const App = () => {
  const wsConfig = {
    url: 'ws://localhost:3000/ws',
    token: 'your-auth-token',
    heartbeatInterval: 30000,
    reconnectAttempts: 10,
    debug: true,
  };

  return (
    <WebSocketProvider config={wsConfig}>
      <YourAppComponents />
    </WebSocketProvider>
  );
};
```

### 2. Usar WebSocket en componentes

```tsx
import { useWebSocket } from '@/contexts/websocket';

const MyComponent = () => {
  const { 
    isConnected, 
    sendMessage, 
    lastJsonMessage, 
    subscribe 
  } = useWebSocket();

  useEffect(() => {
    if (isConnected) {
      subscribe('notifications');
    }
  }, [isConnected, subscribe]);

  const handleSendMessage = () => {
    sendMessage({
      type: MessageType.NOTIFICATION,
      data: { message: 'Hello WebSocket!' }
    });
  };

  return (
    <div>
      <p>Estado: {isConnected ? 'Conectado' : 'Desconectado'}</p>
      <button onClick={handleSendMessage}>Enviar Mensaje</button>
      {lastJsonMessage && (
        <p>Último mensaje: {JSON.stringify(lastJsonMessage)}</p>
      )}
    </div>
  );
};
```

## 🔧 Hooks Disponibles

### useWebSocket()
Hook principal para acceder a la funcionalidad WebSocket.

```tsx
const { 
  isConnected,
  isConnecting,
  readyState,
  sendMessage,
  sendPing,
  subscribe,
  lastMessage,
  lastJsonMessage,
  error,
  config 
} = useWebSocket();
```

### useWebSocketAutoReconnect()
Hook para manejar reconexión automática con backoff exponencial.

```tsx
const { isReconnecting, reconnectAttempts, maxAttempts } = 
  useWebSocketAutoReconnect(
    true,    // habilitado
    10,      // máximo intentos
    1000     // delay inicial en ms
  );
```

### useWebSocketMessage()
Hook para filtrar mensajes por tipo.

```tsx
// Filtrar solo notificaciones
const notificationData = useWebSocketMessage(
  MessageType.NOTIFICATION,
  (data) => data as NotificationData
);

// Escuchar todos los mensajes
const allMessages = useWebSocketMessage();
```

### useWebSocketSubscription()
Hook para suscribirse automáticamente a topics.

```tsx
// Suscribirse a un topic
const { subscribedTopics } = useWebSocketSubscription('alerts');

// Suscribirse a múltiples topics
const { subscribedTopics } = useWebSocketSubscription([
  'alerts', 
  'notifications', 
  'updates'
]);
```

### useWebSocketCommands()
Hook para enviar comandos con cola automática.

```tsx
const { sendCommand, clearQueue, queueSize } = useWebSocketCommands();

const handleSendCommand = () => {
  // Se envía inmediatamente si está conectado,
  // o se encola para envío posterior
  sendCommand({
    type: MessageType.SUBSCRIBE,
    topic: 'new-topic'
  });
};
```

### useWebSocketStats()
Hook para obtener estadísticas de la conexión.

```tsx
const { 
  messagesReceived,
  connectionTime,
  lastMessageTime,
  errorCount,
  uptime 
} = useWebSocketStats();
```

## 📝 Tipos Disponibles

```tsx
enum MessageType {
  WELCOME = 'welcome',
  PONG = 'pong',
  SUBSCRIBED = 'subscribed',
  NOTIFICATION = 'notification',
  ERROR = 'error',
  PING = 'ping',
  SUBSCRIBE = 'subscribe',
}

interface WebSocketMessage {
  type: MessageType;
  timestamp?: number;
  userId?: string;
  topic?: string;
  data?: unknown;
  message?: string;
}

interface WebSocketConfig {
  url: string;
  token?: string;
  protocols?: string | string[];
  reconnectAttempts?: number;
  reconnectInterval?: number;
  heartbeatInterval?: number;
  debug?: boolean;
}
```

## 🌟 Ventajas sobre la implementación anterior

1. **Compartir entre pestañas**: Una sola conexión WebSocket compartida entre todas las pestañas
2. **Menos complejidad**: No necesitas manejar Worker threads manualmente
3. **Mejor rendimiento**: La biblioteca está optimizada y bien mantenida
4. **Documentación**: Biblioteca popular con buena documentación
5. **Reconexión inteligente**: Algoritmos de reconexión más sofisticados
6. **Menos código**: Menos código personalizado que mantener

## 🔍 Debugging

Habilita el modo debug en la configuración:

```tsx
const wsConfig = {
  url: 'ws://localhost:3000/ws',
  debug: true, // Esto mostrará logs detallados en la consola
};
```

## 📦 Dependencias

- `react-use-websocket`: Biblioteca principal para WebSocket en React
- `react`: ^19.0.0 (compatible con React 18+)

## 🚀 Migración desde la implementación anterior

La nueva implementación es un drop-in replacement. Solo necesitas:

1. Cambiar las importaciones:
   ```tsx
   // Antes
   import { SharedWebSocketProvider, useSharedWebSocket } from '@/libs/ws';
   
   // Ahora
   import { WebSocketProvider, useWebSocket } from '@/contexts/websocket';
   ```

2. El API es compatible, solo algunos nombres de propiedades pueden haber cambiado.
