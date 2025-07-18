import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CardNotification from '.';
import { Notification } from '@/entities/Notification.entity';

vi.mock('@/utils', () => ({
  formatDateHour: () => '18/07/2025 18:30',
}));

const mockNotification: Notification = {
  id: 1,
  type: 'Alerta',
  timestamp: '2025-07-18T18:30:00.000Z',
  message: 'Se ha detectado una anomalía en el sistema.',
  userName: 'Admin',
  entity: 'Servidor',
  entityId: 0,
  userId: 0,
  viewed: false,
  viewedAt: '',
  viewedBy: 0,
};

describe('CardNotification', () => {
  it('should render the notification correctly', () => {
    render(<CardNotification data={mockNotification} />);

    expect(screen.getByText(mockNotification.type)).toBeInTheDocument();
    expect(screen.getByText(mockNotification.message)).toBeInTheDocument();
    expect(
      screen.getByText(`por: ${mockNotification.userName}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`tipo: ${mockNotification.entity}`)
    ).toBeInTheDocument();
    expect(screen.getByText('18/07/2025 18:30')).toBeInTheDocument();
  });
});
