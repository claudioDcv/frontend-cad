import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach, Mock } from 'vitest';
import NotificationsContainer from './index';
import { FetchStatus } from '@/constants';
import { useToggleState } from '@/hooks/useToggleState';

vi.mock('./hooks/userServices', () => {
  return {
    __esModule: true,
    default: vi.fn(() => ({
      getUnviewedNotifications: { status: FetchStatus.SUCCESS, count: 5 },
    })),
  };
});

vi.mock('@/contexts/notification/useNotification', () => {
  return {
    __esModule: true,
    useNotification: vi.fn(() => ({
      unviewedCounter: 5,
      setUnviewedCounter: vi.fn(),
    })),
  };
});

vi.mock('@/hooks/useToggleState', () => {
  return {
    __esModule: true,
    useToggleState: vi.fn(() => ({
      isOpen: false,
      open: vi.fn(),
      close: vi.fn(),
    })),
  };
});

vi.mock('./components/notifications-dialog', () => {
  return {
    __esModule: true,
    default: ({ onClose }: { onClose: () => void }) => (
      <div>
        <p>NotificationsDialog</p>
        <button onClick={onClose}>Close</button>
      </div>
    ),
  };
});

describe('NotificationsContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the badge with unviewedCounter', () => {
    render(<NotificationsContainer />);
    expect(screen.getByTestId('notifications-container')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('opens drawer when icon is clicked', () => {
    const mockOpen = vi.fn();

    (useToggleState as Mock).mockReturnValueOnce({
      isOpen: false,
      open: mockOpen,
      close: vi.fn(),
    });

    render(<NotificationsContainer />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockOpen).toHaveBeenCalledTimes(1);
  });

  test('renders NotificationsDialog when drawer is open', () => {
    (useToggleState as Mock).mockReturnValueOnce({
      isOpen: true,
      open: vi.fn(),
      close: vi.fn(),
    });

    render(<NotificationsContainer />);
    expect(screen.getByText('NotificationsDialog')).toBeInTheDocument();
  });
});
