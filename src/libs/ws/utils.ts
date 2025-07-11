import { WebSocketMessage, MessageType } from './types';

/**
 * Utilidades para crear mensajes WebSocket
 */
export class WebSocketMessageBuilder {
  static ping(timestamp: number = Date.now()): WebSocketMessage {
    return {
      type: MessageType.PING,
      timestamp,
    };
  }

  static subscribe(
    topic: string,
    timestamp: number = Date.now()
  ): WebSocketMessage {
    return {
      type: MessageType.SUBSCRIBE,
      topic,
      timestamp,
    };
  }

  static notification(
    data: any,
    topic?: string,
    timestamp: number = Date.now()
  ): WebSocketMessage {
    return {
      type: MessageType.NOTIFICATION,
      data,
      topic,
      timestamp,
    };
  }

  static custom(
    type: string,
    payload: Record<string, any> = {}
  ): WebSocketMessage {
    return {
      type: type as MessageType,
      timestamp: Date.now(),
      ...payload,
    };
  }
}

/**
 * Utilidades para manejo de URLs WebSocket
 */
export class WebSocketUrlBuilder {
  private baseUrl: string;
  private params: URLSearchParams;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.params = new URLSearchParams();
  }

  addParam(key: string, value: string): this {
    this.params.set(key, value);
    return this;
  }

  addToken(token: string): this {
    return this.addParam('token', token);
  }

  addUserId(userId: string): this {
    return this.addParam('userId', userId);
  }

  build(): string {
    const paramString = this.params.toString();
    return paramString ? `${this.baseUrl}?${paramString}` : this.baseUrl;
  }
}

/**
 * Utilidades para logging
 */
export class LogFormatter {
  static formatTimestamp(date: Date): string {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  static formatMessage(message: WebSocketMessage): string {
    try {
      return JSON.stringify(message, null, 2);
    } catch {
      return String(message);
    }
  }

  static getMessageTypeEmoji(type: MessageType): string {
    const emojis: Record<MessageType, string> = {
      [MessageType.WELCOME]: '🎉',
      [MessageType.PONG]: '🏓',
      [MessageType.SUBSCRIBED]: '📢',
      [MessageType.NOTIFICATION]: '🔔',
      [MessageType.ERROR]: '❌',
      [MessageType.PING]: '📤',
      [MessageType.SUBSCRIBE]: '📝',
    };
    return emojis[type] || '📨';
  }
}

/**
 * Validador de configuración WebSocket
 */
export class WebSocketConfigValidator {
  static validate(config: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validar URL
    if (!config.url) {
      errors.push('URL es requerida');
    } else if (!this.isValidWebSocketUrl(config.url)) {
      errors.push('URL debe ser una URL de WebSocket válida (ws:// o wss://)');
    }

    // Validar heartbeatInterval
    if (config.heartbeatInterval !== undefined) {
      if (
        typeof config.heartbeatInterval !== 'number' ||
        config.heartbeatInterval < 1000
      ) {
        errors.push('heartbeatInterval debe ser un número mayor a 1000ms');
      }
    }

    // Validar reconnectAttempts
    if (config.reconnectAttempts !== undefined) {
      if (
        typeof config.reconnectAttempts !== 'number' ||
        config.reconnectAttempts < 0
      ) {
        errors.push('reconnectAttempts debe ser un número no negativo');
      }
    }

    // Validar reconnectInterval
    if (config.reconnectInterval !== undefined) {
      if (
        typeof config.reconnectInterval !== 'number' ||
        config.reconnectInterval < 1000
      ) {
        errors.push('reconnectInterval debe ser un número mayor a 1000ms');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private static isValidWebSocketUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'ws:' || parsed.protocol === 'wss:';
    } catch {
      return false;
    }
  }
}

/**
 * Detector de capacidades del navegador
 */
export class BrowserCapabilities {
  static supportsWebSocket(): boolean {
    return typeof WebSocket !== 'undefined';
  }

  static supportsCloseEvent(): boolean {
    return typeof CloseEvent !== 'undefined';
  }

  static supportsMessageEvent(): boolean {
    return typeof MessageEvent !== 'undefined';
  }

  static getWebSocketInfo(): {
    supported: boolean;
    version?: string;
    readyStates: Record<string, number>;
  } {
    if (!this.supportsWebSocket()) {
      return { supported: false, readyStates: {} };
    }

    return {
      supported: true,
      readyStates: {
        CONNECTING: WebSocket.CONNECTING,
        OPEN: WebSocket.OPEN,
        CLOSING: WebSocket.CLOSING,
        CLOSED: WebSocket.CLOSED,
      },
    };
  }
}

/**
 * Monitor de rendimiento WebSocket
 */
export class WebSocketPerformanceMonitor {
  private startTime: number = 0;
  private endTime: number = 0;
  private messageCount: number = 0;
  private dataTransferred: number = 0;

  startMonitoring(): void {
    this.startTime = performance.now();
    this.messageCount = 0;
    this.dataTransferred = 0;
  }

  recordMessage(messageSize: number): void {
    this.messageCount++;
    this.dataTransferred += messageSize;
  }

  stopMonitoring(): {
    duration: number;
    messageCount: number;
    dataTransferred: number;
    messagesPerSecond: number;
    bytesPerSecond: number;
  } {
    this.endTime = performance.now();
    const duration = this.endTime - this.startTime;
    const durationSeconds = duration / 1000;

    return {
      duration,
      messageCount: this.messageCount,
      dataTransferred: this.dataTransferred,
      messagesPerSecond:
        durationSeconds > 0 ? this.messageCount / durationSeconds : 0,
      bytesPerSecond:
        durationSeconds > 0 ? this.dataTransferred / durationSeconds : 0,
    };
  }
}

/**
 * Utilidades de debugging
 */
export class WebSocketDebugger {
  private static logs: Array<{
    timestamp: Date;
    type: 'send' | 'receive' | 'connect' | 'disconnect' | 'error';
    data: any;
  }> = [];

  static log(
    type: 'send' | 'receive' | 'connect' | 'disconnect' | 'error',
    data: any
  ): void {
    this.logs.push({
      timestamp: new Date(),
      type,
      data,
    });

    // Mantener solo los últimos 1000 logs
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-1000);
    }
  }

  static getLogs(): typeof this.logs {
    return [...this.logs];
  }

  static clearLogs(): void {
    this.logs = [];
  }

  static exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  static importLogs(jsonString: string): boolean {
    try {
      const imported = JSON.parse(jsonString);
      if (Array.isArray(imported)) {
        this.logs = imported;
        return true;
      }
    } catch {
      // Error al parsear
    }
    return false;
  }
}
