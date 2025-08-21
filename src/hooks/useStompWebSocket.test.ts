import { act, renderHook } from "@testing-library/react";
import { StompConfig, StompMessage, useStompWebSocket } from "./useStompWebSocket";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// Mock dependencies
vi.mock('@stomp/stompjs');
vi.mock('sockjs-client');

const mockClient = {
    activate: vi.fn(),
    deactivate: vi.fn(),
    connected: false,
    subscribe: vi.fn(),
    publish: vi.fn(),
    onConnect: vi.fn(),
    onStompError: vi.fn(),
    onWebSocketError: vi.fn(),
    onDisconnect: vi.fn(),
    onWebSocketClose: vi.fn(),
};

const mockSockJS = vi.fn();

vi.mocked(Client).mockImplementation(() => mockClient as unknown as Client);
vi.mocked(SockJS).mockImplementation(mockSockJS);

describe('useStompWebSocket', () => {
    const defaultConfig: StompConfig = {
        url: 'ws://localhost:8080/ws',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsIm5vbWJyZSI6IlRlc3QiLCJhcGVsbGlkbyI6IlVzZXIifQ.test',
        debug: false,
        maxReconnectAttempts: 5,
        heartbeatInterval: 30000
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockClient.connected = false;
        console.log = vi.fn();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it('should initialize with correct default state', () => {
        const { result } = renderHook(() => useStompWebSocket(defaultConfig));

        expect(result.current.isConnected).toBe(false);
        expect(result.current.isConnecting).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.lastNotification).toBeNull();
        expect(result.current.reconnectAttempts).toBe(0);
    });

    it('should connect successfully with valid token', async () => {
        vi.useFakeTimers();
        const { result } = renderHook(() => useStompWebSocket(defaultConfig));

        act(() => {
            result.current.connect();
        });

        expect(result.current.isConnecting).toBe(true);
        expect(mockClient.activate).toHaveBeenCalled();

        // Simulate successful connection
        act(() => {
            mockClient.onConnect({ headers: {}, body: '' });
        });

        expect(result.current.isConnected).toBe(true);
        expect(result.current.isConnecting).toBe(false);
        expect(result.current.error).toBeNull();

        vi.useRealTimers();
    });

    it('should handle connection error', () => {
        const { result } = renderHook(() => useStompWebSocket(defaultConfig));

        act(() => {
            result.current.connect();
        });

        // Simulate STOMP error
        act(() => {
            mockClient.onStompError({
                headers: { message: 'Authentication failed' },
                body: 'Invalid token'
            });
        });

        expect(result.current.isConnected).toBe(false);
        expect(result.current.isConnecting).toBe(false);
        expect(result.current.error).toContain('Authentication failed');
    });

    it('should not connect with invalid token', () => {
        const invalidConfig = { ...defaultConfig, token: '' };
        const { result } = renderHook(() => useStompWebSocket(invalidConfig));

        act(() => {
            result.current.connect();
        });

        expect(result.current.error).toBe('Token JWT requerido');
        expect(mockClient.activate).not.toHaveBeenCalled();
    });

    it('should not connect when already connected', () => {
        const { result } = renderHook(() => useStompWebSocket(defaultConfig));

        // First connection
        act(() => {
            result.current.connect();
            mockClient.onConnect({ headers: {}, body: '' });
        });

        expect(result.current.isConnected).toBe(true);

        // Try to connect again
        act(() => {
            result.current.connect();
        });

        expect(mockClient.activate).toHaveBeenCalledTimes(1);
    });

    it('should disconnect successfully', () => {
        const { result } = renderHook(() => useStompWebSocket(defaultConfig));

        // Connect first
        act(() => {
            result.current.connect();
            mockClient.connected = true;
            mockClient.onConnect({ headers: {}, body: '' });
        });

        expect(result.current.isConnected).toBe(true);

        // Disconnect
        act(() => {
            result.current.disconnect();
        });

        expect(mockClient.deactivate).toHaveBeenCalled();
        expect(result.current.isConnected).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should send notification when connected', () => {
        const { result } = renderHook(() => useStompWebSocket(defaultConfig));

        // Connect first
        act(() => {
            result.current.connect();
            mockClient.connected = true;
            mockClient.onConnect({ headers: {}, body: '' });
        });

        const notification: StompMessage = {
            type: 'test',
            payload: { message: 'Hello' }
        };

        act(() => {
            result.current.sendNotification(notification);
        });

        expect(mockClient.publish).toHaveBeenCalledWith({
            destination: '/app/notification',
            body: JSON.stringify(notification)
        });
    });

    it('should not send notification when disconnected', () => {
        const { result } = renderHook(() => useStompWebSocket(defaultConfig));

        const notification: StompMessage = {
            type: 'test',
            payload: { message: 'Hello' }
        };

        act(() => {
            result.current.sendNotification(notification);
        });

        expect(mockClient.publish).not.toHaveBeenCalled();
    });

    it('should send ping when connected', () => {
        const { result } = renderHook(() => useStompWebSocket(defaultConfig));

        // Connect first
        act(() => {
            result.current.connect();
            mockClient.connected = true;
            mockClient.onConnect({ headers: {}, body: '' });
        });

        act(() => {
            result.current.sendPing();
        });

        expect(mockClient.publish).toHaveBeenCalledWith({
            destination: '/app/ping',
            body: expect.stringContaining('"type":"ping"')
        });
    });

    it('should handle debug mode correctly', () => {
        const debugConfig = { ...defaultConfig, debug: true };
        const { result } = renderHook(() => useStompWebSocket(debugConfig));

        act(() => {
            result.current.connect();
        });

        expect(console.log).toHaveBeenCalled();
    });

    it('should auto-connect with valid token', () => {
        vi.useFakeTimers();

        renderHook(() => useStompWebSocket(defaultConfig));

        // Fast-forward the auto-connect timer
        act(() => {
            vi.advanceTimersByTime(1000);
        });

        expect(mockClient.activate).toHaveBeenCalled();

        vi.useRealTimers();
    });

    it('should handle reconnection attempts', () => {
        vi.useFakeTimers();
        const { result } = renderHook(() => useStompWebSocket(defaultConfig));

        // Connect first
        act(() => {
            result.current.connect();
            mockClient.onConnect({ headers: {}, body: '' });
        });

        // Simulate WebSocket close (not intentional)
        act(() => {
            mockClient.onWebSocketClose({ code: 1006, reason: 'Connection lost' });
        });

        expect(result.current.reconnectAttempts).toBe(1);

        // Fast-forward to trigger reconnection
        act(() => {
            vi.advanceTimersByTime(5000);
        });

        expect(mockClient.activate).toHaveBeenCalledTimes(3);

        vi.useRealTimers();
    });
});
