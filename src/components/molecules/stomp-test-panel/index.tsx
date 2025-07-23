import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Chip,
  Alert,
  Stack
} from '@mui/material';
import { useStompNotifications } from '../../../hooks/useStompNotifications';

const StompTestPanel: React.FC = () => {
  const {
    isConnected,
    isConnecting,
    lastNotification,
    sendNotification,
    sendPing,
    error,
    reconnectAttempts
  } = useStompNotifications();

  const [mensaje, setMensaje] = useState('');

  const handleSendNotification = () => {
    if (!mensaje.trim()) {
      alert('Por favor ingresa un mensaje');
      return;
    }

    sendNotification({
      contenido: mensaje,
      tipo: 'GENERAL',
      importante: false
    });

    setMensaje('');
  };

  const handleSendPing = () => {
    sendPing();
  };

  const getStatusColor = () => {
    if (isConnecting) return 'warning';
    if (isConnected) return 'success';
    return 'error';
  };

  const getStatusText = () => {
    if (isConnecting) return 'Conectando...';
    if (isConnected) return 'Conectado';
    return 'Desconectado';
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '20px auto', padding: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            🚀 Panel de Prueba STOMP
          </Typography>

          {/* Estado de Conexión */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              📊 Estado de Conexión
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip 
                label={getStatusText()} 
                color={getStatusColor()}
                variant="outlined"
              />
              {reconnectAttempts > 0 && (
                <Chip 
                  label={`Reintentos: ${reconnectAttempts}`} 
                  color="warning"
                  size="small"
                />
              )}
            </Stack>
          </Box>

          {/* Error */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Enviar Notificación */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              📢 Enviar Notificación
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Mensaje"
                multiline
                rows={3}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                disabled={!isConnected}
                fullWidth
              />
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSendNotification}
                  disabled={!isConnected || !mensaje.trim()}
                  startIcon={<span>📤</span>}
                >
                  Enviar Mensaje
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleSendPing}
                  disabled={!isConnected}
                  startIcon={<span>🏓</span>}
                >
                  Ping
                </Button>
              </Stack>
            </Stack>
          </Box>

          {/* Última Notificación */}
          {lastNotification && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                📬 Última Notificación Recibida
              </Typography>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    Tipo: {lastNotification.tipo || 'N/A'}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {lastNotification.contenido || 'Sin contenido'}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {lastNotification.timestamp || 'Sin timestamp'}
                  </Typography>
                  {lastNotification.importante && (
                    <Chip 
                      label="¡Importante!" 
                      color="error" 
                      size="small" 
                      sx={{ ml: 1 }}
                    />
                  )}
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Instrucciones */}
          <Alert severity="info">
            <Typography variant="body2">
              💡 <strong>Instrucciones:</strong>
              <br />
              1. La conexión STOMP debería establecerse automáticamente
              <br />
              2. Envía un mensaje para probarlo
              <br />
              3. Haz ping para verificar la conectividad
              <br />
              4. Las notificaciones aparecerán aquí cuando lleguen
            </Typography>
          </Alert>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StompTestPanel;
