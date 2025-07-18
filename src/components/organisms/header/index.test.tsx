import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Header from './index';

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
  NotificationContainer: () => <div data-testid="notification-container" />,
}));

vi.mock('../notification-container/components/receiver', () => ({
  default: () => <div data-testid="receiver" />,
}));

describe('Header component', () => {
  test('renders Breadcrumb, Receiver and NotificationContainer correctly', () => {
    render(<Header />);
    expect(screen.getByTestId('breadcrumb')).toHaveTextContent('Home > Dashboard');
    expect(screen.getByTestId('receiver')).toBeInTheDocument();
    expect(screen.getByTestId('notification-container')).toBeInTheDocument();
  });
});
