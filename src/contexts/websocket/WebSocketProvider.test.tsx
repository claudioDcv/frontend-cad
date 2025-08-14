import { render, screen } from '@testing-library/react';
import { WebSocketProvider, WebSocketContext } from './WebSocketProvider';
import { ReadyState } from 'react-use-websocket';

describe('WebSocketProvider', () => {
    const mockConfig = {
        url: 'ws://localhost:8080/ws',
        token: 'test-token',
        debug: false,
        reconnectAttempts: 3,
        reconnectInterval: 1000,
        connectionType: 'websocket' as const, // Explicitly set as const to match the type
    };

    it('should provide the correct context values', () => {
        render(
            <WebSocketProvider config={mockConfig}>
                <WebSocketContext.Consumer>
                    {(value) => (
                        <div>
                            <span data-testid="isConnected">{value?.isConnected ? 'true' : 'false'}</span>
                            <span data-testid="isConnecting">{value?.isConnecting ? 'true' : 'false'}</span>
                            <span data-testid="readyState">{value?.readyState}</span>
                        </div>
                    )}
                </WebSocketContext.Consumer>
            </WebSocketProvider>
        );

        expect(screen.getByTestId('isConnected').textContent).toBe('false');
        expect(screen.getByTestId('isConnecting').textContent).toBe('true');
        expect(screen.getByTestId('readyState').textContent).toBe(String(ReadyState.CONNECTING));
    });

    it('should render children', () => {
        render(
            <WebSocketProvider config={mockConfig}>
                <div data-testid="child">Child Component</div>
            </WebSocketProvider>
        );

        expect(screen.getByTestId('child')).toBeInTheDocument();
    });
});
