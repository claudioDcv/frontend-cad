import {
  WebSocketProvider,
  useWebSocket,
  useWebSocketAutoReconnect,
  useWebSocketStats,
  LogType
} from '../';

// Configuración del WebSocket
const config = {
  url: 'ws://172.16.22.240:3003/ws/notifications',
  token: 'eyJhbGciOiAiUlMyNTYiLCAidHlwIjogIkpXVCJ9.eyJzdWIiOiAidGVzdFVzZXIiLCAiaWF0IjogMTcwMTIzNDU2NywgImV4cCI6IDE3MDEyMzgxNjd9.B7w0xu-m_Ao97H9VXjK8RF9wPMvvCq3EI4xiYwBSbd-U3kHXegzVmwNGLneCo48Q',
  heartbeatInterval: 30000,
  debug: true,
};

// Componente principal que usa WebSocket
function WebSocketExample() {
  const {
    isConnected,
    isConnecting,
    connect,
    disconnect,
    sendPing,
    subscribe,
    clearLogs,
    logs,
    lastMessage,
    error
  } = useWebSocket();

  const stats = useWebSocketStats();
  
  // Reconexión automática
  const { isReconnecting, reconnectAttempts } = useWebSocketAutoReconnect(
    true, // habilitado
    5,    // máximo 5 intentos
    3000  // 3 segundos entre intentos
  );

  const handleSubscribe = () => {
    subscribe('alerts');
  };

  const getStatusColor = () => {
    if (isConnecting) return '#ffa500';
    if (isConnected) return '#28a745';
    return '#dc3545';
  };

  const getLogColor = (type: LogType) => {
    switch (type) {
      case LogType.ERROR: return '#ff6b6b';
      case LogType.SUCCESS: return '#51cf66';
      case LogType.WARNING: return '#ffd43b';
      default: return '#ffffff';
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>🚀 React WebSocket Example</h1>
      
      {/* Estado de conexión */}
      <div style={{
        padding: '15px',
        margin: '20px 0',
        borderRadius: '5px',
        textAlign: 'center',
        backgroundColor: getStatusColor(),
        color: 'white',
        fontWeight: 'bold'
      }}>
        {isConnecting ? '🔄 Conectando...' : isConnected ? '✅ Conectado' : '❌ Desconectado'}
        {isReconnecting && <div>🔄 Reintentando conexión... ({reconnectAttempts}/5)</div>}
      </div>

      {/* Error */}
      {error && (
        <div style={{
          padding: '10px',
          margin: '10px 0',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderRadius: '5px',
          border: '1px solid #f5c6cb'
        }}>
          ❌ Error: {error}
        </div>
      )}

      {/* Estadísticas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        margin: '20px 0'
      }}>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.messagesSent}</div>
          <div style={statLabelStyle}>Mensajes Enviados</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.messagesReceived}</div>
          <div style={statLabelStyle}>Mensajes Recibidos</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.connectionTime}</div>
          <div style={statLabelStyle}>Tiempo Conectado</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.connectionAttempts}</div>
          <div style={statLabelStyle}>Intentos de Conexión</div>
        </div>
      </div>

      {/* Controles */}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <button
          style={{...buttonStyle, backgroundColor: '#007bff'}}
          onClick={connect}
          disabled={isConnected || isConnecting}
        >
          Conectar
        </button>
        <button
          style={{...buttonStyle, backgroundColor: '#dc3545'}}
          onClick={disconnect}
          disabled={!isConnected}
        >
          Desconectar
        </button>
        <button
          style={{...buttonStyle, backgroundColor: '#28a745'}}
          onClick={sendPing}
          disabled={!isConnected}
        >
          PING
        </button>
        <button
          style={{...buttonStyle, backgroundColor: '#ffc107', color: 'black'}}
          onClick={handleSubscribe}
          disabled={!isConnected}
        >
          Suscribirse
        </button>
        <button
          style={{...buttonStyle, backgroundColor: '#6c757d'}}
          onClick={clearLogs}
        >
          Limpiar Log
        </button>
      </div>

      {/* Último mensaje */}
      {lastMessage && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          <h3>Último mensaje recibido:</h3>
          <pre style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '3px', overflow: 'auto' }}>
            {JSON.stringify(lastMessage, null, 2)}
          </pre>
        </div>
      )}

      {/* Log de eventos */}
      <div style={{
        backgroundColor: '#000',
        color: '#0f0',
        padding: '20px',
        height: '300px',
        overflowY: 'scroll',
        fontFamily: 'Courier New, monospace',
        fontSize: '14px',
        borderRadius: '5px'
      }}>
        {logs.map((log) => (
          <div key={log.id} style={{ color: getLogColor(log.type), marginBottom: '2px' }}>
            <span style={{ color: '#888', fontSize: '12px' }}>
              [{log.timestamp.toLocaleTimeString()}]
            </span> {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}

// Estilos reutilizables
const buttonStyle = {
  padding: '10px 20px',
  margin: '5px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  color: 'white',
  transition: 'opacity 0.3s',
};

const statCardStyle = {
  backgroundColor: '#f8f9fa',
  padding: '15px',
  borderRadius: '5px',
  textAlign: 'center' as const,
  border: '1px solid #dee2e6',
};

const statValueStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#007bff',
};

const statLabelStyle = {
  fontSize: '14px',
  color: '#6c757d',
  marginTop: '5px',
};

// App principal con Provider
function App() {
  return (
    <WebSocketProvider config={config}>
      <WebSocketExample />
    </WebSocketProvider>
  );
}

export default App;
