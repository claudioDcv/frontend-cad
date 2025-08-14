import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Header from './index';
import { WebSocketProvider } from '@/contexts/websocket/WebSocketProvider';

vi.mock('wouter', () => ({
  useLocation: () => ['/some-path'],
}));

vi.mock('./index.utils', () => ({
  matchRoute: () => ({ match: ['Home', 'Dashboard'] }),
}));

vi.mock('@/components', () => ({
  Breadcrumb: ({ items }: { items: string[] }) => (
    <div data-testid="breadcrumb">{items.join(' > ')}</div>
  ),
  NotificationsContainer: () => <div data-testid="notification-container" />,
}));

vi.mock('../notification-container/components/receiver', () => ({
  default: () => <div data-testid="receiver" />,
}));

describe('Header component', () => {
  const config = {
    url: 'wss://api.example.com/socket',
  };
  test('renders Breadcrumb, Receiver and NotificationsContainer correctly', () => {
    render(<WebSocketProvider config={config}><Header /></WebSocketProvider>);
    expect(screen.getByTestId('breadcrumb')).toHaveTextContent('Home > Dashboard');
    expect(screen.getByTestId('receiver')).toBeInTheDocument();
    expect(screen.getByTestId('notification-container')).toBeInTheDocument();
  });
});
