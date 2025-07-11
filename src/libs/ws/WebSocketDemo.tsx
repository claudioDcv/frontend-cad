import { useWebSocketStats, useWebSocketLogs, useWebSocket } from './hooks';
import { LogType } from './types';

// Estilos CSS-in-JS (puedes moverlos a un archivo CSS separado)
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    color: '#333',
    textAlign: 'center' as const,
    marginBottom: '20px',
  },
  status: {
    padding: '15px',
    margin: '20px 0',
    borderRadius: '5px',
    textAlign: 'center' as const,
    fontWeight: 'bold',
    fontSize: '18px',
    transition: 'all 0.3s',
  },
  statusDisconnected: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
  },
  statusConnecting: {
    backgroundColor: '#fff3cd',
    color: '#856404',
    border: '1px solid #ffeaa7',
  },
  statusConnected: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    margin: '20px 0',
  },
  statCard: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '5px',
    textAlign: 'center' as const,
    border: '1px solid #dee2e6',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#007bff',
  },
  statLabel: {
    fontSize: '14px',
    color: '#6c757d',
    marginTop: '5px',
  },
  controls: {
    margin: '20px 0',
    textAlign: 'center' as const,
  },
  button: {
    padding: '10px 20px',
    margin: '5px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonPrimary: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  buttonSuccess: {
    backgroundColor: '#28a745',
    color: 'white',
  },
  buttonWarning: {
    backgroundColor: '#ffc107',
    color: 'black',
  },
  buttonDanger: {
    backgroundColor: '#dc3545',
    color: 'white',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  log: {
    backgroundColor: '#000',
    color: '#0f0',
    padding: '20px',
    height: '400px',
    overflowY: 'scroll' as const,
    fontFamily: "'Courier New', monospace",
    fontSize: '14px',
    borderRadius: '5px',
    marginTop: '20px',
  },
  logEntry: {
    marginBottom: '2px',
  },
  timestamp: {
    color: '#888',
    fontSize: '12px',
  },
} as const;

interface WebSocketDemoProps {
  className?: string;
}

export function WebSocketDemo({ className }: WebSocketDemoProps) {
  const {
    isConnected,
    isConnecting,
    connect,
    disconnect,
    sendPing,
    subscribe,
    clearLogs,
    error,
  } = useWebSocket();

  const stats = useWebSocketStats();
  const logs = useWebSocketLogs();

  const getStatusStyle = () => {
    if (isConnecting) return { ...styles.status, ...styles.statusConnecting };
    if (isConnected) return { ...styles.status, ...styles.statusConnected };
    return { ...styles.status, ...styles.statusDisconnected };
  };

  const getStatusText = () => {
    if (isConnecting) return '🔄 Conectando...';
    if (isConnected) return '✅ Conectado';
    return '❌ Desconectado';
  };

  const getLogColor = (type: LogType) => {
    switch (type) {
      case LogType.ERROR:
        return '#ff6b6b';
      case LogType.SUCCESS:
        return '#51cf66';
      case LogType.WARNING:
        return '#ffd43b';
      default:
        return '#0f0';
    }
  };

  const handleSubscribe = () => {
    subscribe('alerts');
  };

  return (
    <div style={styles.container} className={className}>
      <h1 style={styles.title}>🚀 WebSocket Test Avanzado</h1>

      {/* Estado de Conexión */}
      <div style={getStatusStyle()}>{getStatusText()}</div>

      {/* Error */}
      {error && (
        <div
          style={{
            ...styles.status,
            backgroundColor: '#f8d7da',
            color: '#721c24',
          }}
        >
          ❌ Error: {error}
        </div>
      )}

      {/* Estadísticas */}
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.messagesSent}</div>
          <div style={styles.statLabel}>Mensajes Enviados</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.messagesReceived}</div>
          <div style={styles.statLabel}>Mensajes Recibidos</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.connectionTime}</div>
          <div style={styles.statLabel}>Tiempo Conectado</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.connectionAttempts}</div>
          <div style={styles.statLabel}>Intentos de Conexión</div>
        </div>
      </div>

      {/* Controles */}
      <div style={styles.controls}>
        <button
          style={{
            ...styles.button,
            ...styles.buttonPrimary,
            ...(isConnected ? styles.buttonDisabled : {}),
          }}
          onClick={connect}
          disabled={isConnected || isConnecting}
        >
          Conectar
        </button>
        <button
          style={{
            ...styles.button,
            ...styles.buttonDanger,
            ...(!isConnected ? styles.buttonDisabled : {}),
          }}
          onClick={disconnect}
          disabled={!isConnected}
        >
          Desconectar
        </button>
        <button
          style={{
            ...styles.button,
            ...styles.buttonSuccess,
            ...(!isConnected ? styles.buttonDisabled : {}),
          }}
          onClick={sendPing}
          disabled={!isConnected}
        >
          PING
        </button>
        <button
          style={{
            ...styles.button,
            ...styles.buttonWarning,
            ...(!isConnected ? styles.buttonDisabled : {}),
          }}
          onClick={handleSubscribe}
          disabled={!isConnected}
        >
          Suscribirse
        </button>
        <button
          style={{
            ...styles.button,
            ...styles.buttonWarning,
          }}
          onClick={clearLogs}
        >
          Limpiar Log
        </button>
      </div>

      {/* Log de eventos */}
      <div style={styles.log}>
        {logs.map((log) => (
          <div
            key={log.id}
            style={{
              ...styles.logEntry,
              color: getLogColor(log.type),
            }}
          >
            <span style={styles.timestamp}>
              [{log.timestamp.toLocaleTimeString()}]
            </span>{' '}
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}
