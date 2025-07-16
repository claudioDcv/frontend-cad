// websocket.worker.ts - Shared Worker para manejar conexión WebSocket compartida
import { WebSocketMessage, MessageType, WebSocketConfig, LogEntry, LogType, WebSocketStats } from './types';

interface WorkerMessage {
  type: 'connect' | 'disconnect' | 'send' | 'subscribe' | 'ping' | 'get_state';
  payload?: WebSocketMessage | string;
  config?: WebSocketConfig;
  clientId?: string;
}

interface StatePayload {
  isConnected?: boolean;
  isConnecting?: boolean;
  stats?: WebSocketStats;
  lastMessage?: WebSocketMessage | null;
  config?: WebSocketConfig | null;
}

interface WorkerResponse {
  type: 'state_update' | 'message' | 'log' | 'error';
  payload: WebSocketMessage | LogEntry | string | StatePayload;
}

class SharedWebSocketManager {
  private ws: WebSocket | null = null;
  private clients: Set<MessagePort> = new Set();
  private config: WebSocketConfig | null = null;
  private isConnected = false;
  private isConnecting = false;
  private stats = {
    messagesSent: 0,
    messagesReceived: 0,
    connectionAttempts: 0,
    connectionTime: '--',
    isConnected: false,
  };
  private connectionStartTime: number | null = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private connectionTimeInterval: NodeJS.Timeout | null = null;
  private lastMessage: WebSocketMessage | null = null;
  private subscribedTopics: Set<string> = new Set();

  constructor() {
    this.startConnectionTimeUpdater();
  }

  addClient(port: MessagePort) {
    this.clients.add(port);
    
    // Enviar estado actual al nuevo cliente
    this.sendToClient(port, {
      type: 'state_update',
      payload: {
        isConnected: this.isConnected,
        isConnecting: this.isConnecting,
        stats: this.stats,
        lastMessage: this.lastMessage,
        config: this.config,
      }
    });

    port.onmessage = (event) => {
      this.handleClientMessage(event.data, port);
    };

    port.onmessageerror = () => {
      this.removeClient(port);
    };
  }

  removeClient(port: MessagePort) {
    this.clients.delete(port);
    
    // Si no hay más clientes, desconectar y limpiar intervals
    if (this.clients.size === 0) {
      this.disconnect();
      if (this.connectionTimeInterval) {
        clearInterval(this.connectionTimeInterval);
        this.connectionTimeInterval = null;
      }
    }
  }

  private handleClientMessage(message: WorkerMessage, port: MessagePort) {
    switch (message.type) {
      case 'connect':
        if (message.config) {
          this.config = message.config;
          this.connect();
        }
        break;
      case 'disconnect':
        this.disconnect();
        break;
      case 'send':
        if (message.payload && typeof message.payload === 'object') {
          this.sendMessage(message.payload as WebSocketMessage);
        }
        break;
      case 'subscribe':
        if (message.payload && typeof message.payload === 'string') {
          this.subscribe(message.payload);
        }
        break;
      case 'ping':
        this.sendPing();
        break;
      case 'get_state':
        this.sendToClient(port, {
          type: 'state_update',
          payload: {
            isConnected: this.isConnected,
            isConnecting: this.isConnecting,
            stats: this.stats,
            lastMessage: this.lastMessage,
            config: this.config,
          }
        });
        break;
    }
  }

  private sendToClient(port: MessagePort, response: WorkerResponse) {
    try {
      port.postMessage(response);
    } catch {
      // Cliente desconectado, remover
      this.removeClient(port);
    }
  }

  private broadcastToAllClients(response: WorkerResponse) {
    this.clients.forEach(port => {
      this.sendToClient(port, response);
    });
  }

  private addLog(message: string, type: LogType = LogType.INFO) {
    const logEntry: LogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date(),
      message,
      type,
    };

    this.broadcastToAllClients({
      type: 'log',
      payload: logEntry
    });
  }

  private updateConnectionTime() {
    if (this.connectionStartTime && this.isConnected) {
      const elapsed = Math.floor((Date.now() - this.connectionStartTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      this.stats.connectionTime = timeString;
      this.broadcastToAllClients({
        type: 'state_update',
        payload: { stats: this.stats }
      });
    }
  }

  private startConnectionTimeUpdater() {
    this.connectionTimeInterval = setInterval(() => {
      this.updateConnectionTime();
    }, 1000);
  }

  private connect() {
    if (!this.config) {
      this.addLog('❌ No hay configuración disponible', LogType.ERROR);
      return;
    }

    if (this.ws?.readyState === WebSocket.OPEN) {
      this.addLog('Ya existe una conexión activa', LogType.WARNING);
      return;
    }

    this.stats.connectionAttempts++;
    this.isConnecting = true;
    this.broadcastToAllClients({
      type: 'state_update',
      payload: { isConnecting: this.isConnecting, stats: this.stats }
    });

    this.addLog(`🔄 Intento de conexión #${this.stats.connectionAttempts}`, LogType.INFO);

    try {
      const url = this.config.token
        ? `${this.config.url}?token=${this.config.token}`
        : this.config.url;

      this.ws = new WebSocket(url, this.config.protocols);

      this.ws.onopen = () => {
        this.connectionStartTime = Date.now();
        this.isConnecting = false;
        this.isConnected = true;
        this.stats.isConnected = true;

        this.broadcastToAllClients({
          type: 'state_update',
          payload: {
            isConnected: this.isConnected,
            isConnecting: this.isConnecting,
            stats: this.stats
          }
        });

        this.addLog('✅ Conexión WebSocket establecida exitosamente', LogType.SUCCESS);

        // Reestablecer suscripciones
        this.subscribedTopics.forEach(topic => {
          this.subscribe(topic);
        });

        // Iniciar heartbeat si está configurado
        if (this.config?.heartbeatInterval) {
          this.heartbeatInterval = setInterval(() => {
            this.sendPing();
          }, this.config.heartbeatInterval);
        }
      };

      this.ws.onmessage = (event: MessageEvent) => {
        this.stats.messagesReceived++;

        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          this.lastMessage = data;

          this.broadcastToAllClients({
            type: 'message',
            payload: data
          });

          this.broadcastToAllClients({
            type: 'state_update',
            payload: {
              stats: this.stats,
              lastMessage: this.lastMessage
            }
          });

          if (this.config?.debug) {
            this.addLog(`📨 Mensaje recibido: ${JSON.stringify(data, null, 2)}`, LogType.SUCCESS);
          }

          // Manejar tipos específicos de mensajes
          switch (data.type) {
            case MessageType.WELCOME:
              this.addLog(`🎉 ¡Bienvenido! Usuario: ${data.userId}`, LogType.SUCCESS);
              break;
            case MessageType.PONG:
              this.addLog(`🏓 Pong recibido - Latencia OK`, LogType.SUCCESS);
              break;
            case MessageType.SUBSCRIBED:
              this.addLog(`📢 Suscrito al tema: ${data.topic}`, LogType.SUCCESS);
              if (data.topic) {
                this.subscribedTopics.add(data.topic);
              }
              break;
            case MessageType.NOTIFICATION:
              this.addLog(`🔔 Notificación: ${JSON.stringify(data.data)}`, LogType.WARNING);
              break;
            case MessageType.ERROR:
              this.addLog(`❌ Error del servidor: ${data.message}`, LogType.ERROR);
              break;
          }
        } catch {
          this.addLog(`📨 Mensaje (texto plano): ${event.data}`, LogType.INFO);
        }
      };

      this.ws.onerror = () => {
        this.addLog(`❌ Error en WebSocket`, LogType.ERROR);
        this.broadcastToAllClients({
          type: 'error',
          payload: 'Error de conexión WebSocket'
        });
      };

      this.ws.onclose = (event: CloseEvent) => {
        this.connectionStartTime = null;
        this.isConnecting = false;
        this.isConnected = false;
        this.stats.isConnected = false;
        this.stats.connectionTime = '--';

        this.broadcastToAllClients({
          type: 'state_update',
          payload: {
            isConnected: this.isConnected,
            isConnecting: this.isConnecting,
            stats: this.stats
          }
        });

        // Limpiar heartbeat
        if (this.heartbeatInterval) {
          clearInterval(this.heartbeatInterval);
          this.heartbeatInterval = null;
        }

        this.addLog(
          `🔌 Conexión cerrada - Código: ${event.code}, Razón: ${
            event.reason || 'No especificada'
          }`,
          LogType.WARNING
        );
      };
    } catch (error) {
      this.isConnecting = false;
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      this.addLog(`❌ Error al crear WebSocket: ${errorMessage}`, LogType.ERROR);
      
      this.broadcastToAllClients({
        type: 'error',
        payload: errorMessage
      });
    }
  }

  private disconnect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.close(1000, 'Desconectado por el usuario');
      this.addLog('🔌 Desconectando por solicitud del usuario...', LogType.INFO);
    }

    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private sendMessage(message: WebSocketMessage) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify(message));
        this.stats.messagesSent++;

        this.broadcastToAllClients({
          type: 'state_update',
          payload: { stats: this.stats }
        });

        if (this.config?.debug) {
          this.addLog(`📤 Mensaje enviado: ${JSON.stringify(message)}`, LogType.INFO);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al enviar mensaje';
        this.addLog(`❌ Error al enviar mensaje: ${errorMessage}`, LogType.ERROR);
      }
    } else {
      this.addLog('❌ No hay conexión WebSocket activa', LogType.ERROR);
    }
  }

  private sendPing() {
    const pingMessage: WebSocketMessage = {
      type: MessageType.PING,
      timestamp: Date.now(),
    };
    this.sendMessage(pingMessage);
  }

  private subscribe(topic: string) {
    const subscribeMessage: WebSocketMessage = {
      type: MessageType.SUBSCRIBE,
      topic,
      timestamp: Date.now(),
    };
    this.sendMessage(subscribeMessage);
  }
}

// Instancia global del manager
const wsManager = new SharedWebSocketManager();

// Event listener para nuevas conexiones de clientes
self.addEventListener('connect', (event) => {
  const connectEvent = event as MessageEvent;
  const port = connectEvent.ports[0];
  wsManager.addClient(port);
  port.start();
});

export {};
