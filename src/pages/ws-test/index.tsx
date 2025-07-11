import { useWebSocket, useWebSocketAutoReconnect } from '@/libs/ws';

const WsTest = () => {
  const { isConnected, isConnecting, lastMessage ,connect, subscribe } = useWebSocket();

  const { isReconnecting, reconnectAttempts } = useWebSocketAutoReconnect(
    true, // habilitado
    5, // máximo 5 intentos
    3000 // 3 segundos entre intentos
  );

  const handleSubscribe = () => {
    subscribe('alerts');
  };

  const getStatusColor = () => {
    if (isConnecting) return '#ffa500';
    if (isConnected) return '#28a745';
    return '#dc3545';
  };

  return (
    <div>
      <h1>WsTest</h1>
      <div
        style={{
          padding: '15px',
          margin: '20px 0',
          borderRadius: '5px',
          textAlign: 'center',
          backgroundColor: getStatusColor(),
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        {isConnecting
          ? '🔄 Conectando...'
          : isConnected
          ? '✅ Conectado'
          : '❌ Desconectado'}
        {isReconnecting && (
          <div>🔄 Reintentando conexión... ({reconnectAttempts}/5)</div>
        )}
      </div>
      <button
        style={{ backgroundColor: '#007bff' }}
        onClick={connect}
        disabled={isConnected || isConnecting}
      >
        Conectar
      </button>
      <button
        style={{ backgroundColor: '#ffc107', color: 'black' }}
        onClick={handleSubscribe}
        disabled={!isConnected}
      >
        Suscribirse
      </button>

      <pre>{JSON.stringify(lastMessage, undefined, 2)}</pre>
    </div>
  );
};

export default WsTest;
