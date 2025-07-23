# 🚀 Migración a STOMP WebSocket

## Resumen de Cambios

Se ha migrado el sistema de WebSocket simple a STOMP sobre SockJS para ser compatible con el backend configurado.

### Principales Cambios:

1. **Nuevo Hook STOMP**: `useStompWebSocket.ts`
   - Maneja conexiones STOMP con autenticación JWT
   - Auto-reconexión automática
   - Suscripción a `/topic/notifications` y `/user/queue/pong`

2. **Provider Híbrido**: `WebSocketProviderV2.tsx`
   - Soporta tanto WebSocket simple como STOMP
   - Auto-detecta el tipo de conexión basado en la URL
   - Mantiene compatibilidad con código existente

3. **Hook Simplificado**: `useStompNotifications.ts`
   - Interfaz fácil de usar para notificaciones STOMP
   - Métodos `sendNotification()` y `sendPing()`

4. **Componente de Prueba**: `StompTestPanel`
   - Panel visual para probar funcionalidad STOMP
   - Disponible en `/stomp-test`

### Configuración Actual:

```typescript
const wsConfig = {
  url: 'http://172.16.22.240:3003/ws/notifications',
  connectionType: 'stomp', // Forzar uso de STOMP
  debug: true, // Ver logs en consola
  maxReconnectAttempts: 5,
  heartbeatInterval: 30000,
};
```

### Cómo Funciona:

1. **Conexión Automática**: Se conecta automáticamente cuando hay un token JWT válido
2. **Autenticación**: Usa header `Authorization: Bearer <token>`
3. **Suscripciones**: Auto-suscribe a `/topic/notifications` para notificaciones broadcast
4. **Envío**: Puede enviar mensajes a `/app/notification` y `/app/ping`

### Para Probar:

1. Iniciar la aplicación: `npm run dev`
2. Ir a `/stomp-test` para ver el panel de pruebas
3. Verificar que aparezca "Conectado (STOMP)" en verde
4. Enviar mensajes de prueba

### Estructura de Mensajes:

**Notificación de salida**:
```json
{
  "contenido": "Mensaje de prueba",
  "tipo": "GENERAL",
  "importante": false,
  "timestamp": "2025-07-23T10:30:00.000Z"
}
```

**Notificación de entrada** (desde `/topic/notifications`):
```json
{
  "contenido": "Mensaje recibido",
  "tipo": "SYSTEM",
  "importante": true,
  "timestamp": "2025-07-23T10:30:00.000Z"
}
```

### Compatibilidad:

- ✅ El componente `Receiver` se actualiza automáticamente
- ✅ Mantiene compatibilidad con WebSocket simple como fallback
- ✅ Todas las funcionalidades existentes siguen funcionando

### Logs de Debug:

Con `debug: true` se pueden ver logs como:
```
[STOMP INFO]: 🔄 Intentando conectar con token: eyJhbGciOiJSUzI1NiJ9...
[STOMP SUCCESS]: ✅ Conectado exitosamente al servidor STOMP
[STOMP SUCCESS]: 📡 Suscrito a /topic/notifications y /user/queue/pong
[STOMP SUCCESS]: 📤 Notificación enviada: "Test message"
```

### Verificar Estado:

El indicador en la esquina superior derecha ahora muestra:
- 🟢 Verde: Conectado (STOMP)
- 🟠 Naranja: Conectando...
- 🔴 Rojo: Desconectado
