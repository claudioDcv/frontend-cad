# Migración a Shared WebSocket

## Problema Resuelto

Anteriormente, cuando se abrían múltiples pestañas de la aplicación, cada una intentaba establecer su propia conexión WebSocket, lo que causaba:

- Conflictos de conexión
- Cierre inesperado de conexiones
- Duplicación de mensajes
- Uso ineficiente de recursos

## Solución: Shared Worker

La solución implementa un **Shared Worker** que:

- Mantiene una sola conexión WebSocket compartida entre todas las pestañas
- Distribuye los mensajes a todas las pestañas activas
- Gestiona la reconexión automáticamente
- Optimiza el uso de recursos

## Cómo Migrar

### 1. Cambiar el Provider

**Antes:**
```tsx
import { WebSocketProvider } from './libs/ws';

<WebSocketProvider config={wsConfig}>
  <App />
</WebSocketProvider>
```

**Después:**
```tsx
import { SharedWebSocketProvider } from './libs/ws';

<SharedWebSocketProvider config={wsConfig}>
  <App />
</SharedWebSocketProvider>
```

### 2. Cambiar los Hooks

**Antes:**
```tsx
import { 
  useWebSocket,
  useWebSocketAutoReconnect,
  useWebSocketMessage,
  useWebSocketSubscription 
} from './libs/ws';

const { isConnected, lastMessage, connect, subscribe } = useWebSocket();
const { isReconnecting } = useWebSocketAutoReconnect(true, 5, 3000);
```

**Después:**
```tsx
import { 
  useSharedWebSocket,
  useSharedWebSocketAutoReconnect,
  useSharedWebSocketMessage,
  useSharedWebSocketSubscription 
} from './libs/ws';

const { isConnected, lastMessage, connect, subscribe } = useSharedWebSocket();
const { isReconnecting } = useSharedWebSocketAutoReconnect(true, 5, 3000);
```

### 3. Ejemplo de Componente Migrado

**Antes:**
```tsx
import { useWebSocket, useWebSocketAutoReconnect } from '@/libs/ws';

const NotificationReceiver = () => {
  const { isConnected, lastMessage, connect, subscribe } = useWebSocket();
  const { isReconnecting } = useWebSocketAutoReconnect(true, 5, 3000);
  
  // resto del componente...
};
```

**Después:**
```tsx
import { useSharedWebSocket, useSharedWebSocketAutoReconnect } from '@/libs/ws';

const NotificationReceiver = () => {
  const { isConnected, lastMessage, connect, subscribe } = useSharedWebSocket();
  const { isReconnecting } = useSharedWebSocketAutoReconnect(true, 5, 3000);
  
  // resto del componente...
};
```

## Hooks Disponibles para Shared Worker

- `useSharedWebSocket()` - Hook principal para acceder al contexto
- `useSharedWebSocketAutoReconnect()` - Reconexión automática
- `useSharedWebSocketMessage()` - Escuchar mensajes específicos
- `useSharedWebSocketSubscription()` - Suscribirse a temas
- `useSharedWebSocketLogs()` - Acceder a logs filtrados
- `useSharedWebSocketStats()` - Estadísticas de conexión
- `useSharedWebSocketCommands()` - Enviar comandos predefinidos
- `useSharedWebSocketHeartbeat()` - Heartbeat personalizado

## Verificación de la Migración

Para verificar que la migración funciona correctamente:

1. Abre la aplicación en una pestaña
2. Abre la misma aplicación en otra pestaña
3. Verifica que ambas pestañas:
   - Se conectan correctamente
   - Reciben mensajes
   - No interfieren entre sí

## Configuración de Vite

El `vite.config.ts` ya fue actualizado para soportar Shared Workers:

```typescript
export default defineConfig({
  // ... otras configuraciones
  worker: {
    format: 'es'
  },
});
```

## Compatibilidad

- ✅ Chrome 4+
- ✅ Firefox 29+
- ✅ Safari 16+
- ✅ Edge 79+

## Debugging

Los logs del Shared Worker aparecerán en la consola de cada pestaña. Para debugging avanzado, puedes acceder al worker directamente desde las DevTools.

## Rollback

Si necesitas volver a la implementación anterior, simplemente:

1. Cambia `SharedWebSocketProvider` por `WebSocketProvider`
2. Cambia los hooks `useShared*` por sus equivalentes `use*`
3. El resto del código permanece igual
