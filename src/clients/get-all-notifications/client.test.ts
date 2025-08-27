import { describe, test, expect, vi, type Mock } from 'vitest';
import fetchNotifications from './client';
import { getFetch } from '../customFetch';
import type { Notification } from '@/entities/Notification.entity';
import type { Paginated } from '../types';

vi.mock('../customFetch', () => ({
  getFetch: vi.fn(),
}));

describe('fetchNotifications', () => {
  const mockNotifications: Paginated<Notification> = {
    content: [
      {
        id: 1,
        type: 'INFO',
        entity: 'Contract',
        entityId: 123,
        userName: 'Alice',
        userId: 1,
        message: 'Test message 1',
        timestamp: '2025-08-27T10:00:00Z',
        viewed: false,
        viewedAt: '',
        viewedBy: 0,
      },
      {
        id: 2,
        type: 'WARNING',
        entity: 'Contract',
        entityId: 456,
        userName: 'Bob',
        userId: 2,
        message: 'Test message 2',
        timestamp: '2025-08-27T11:00:00Z',
        viewed: true,
        viewedAt: '2025-08-27T11:05:00Z',
        viewedBy: 2,
      },
    ],
    meta: { count: 2, page: 0 },
  };

  test('calls getFetch with correct parameters', async () => {
    (getFetch as Mock).mockResolvedValueOnce(mockNotifications);

    const query = { page: 1, viewed: null };

    const result = await fetchNotifications(query);

    expect(getFetch).toHaveBeenCalledWith(
      'notifications',
      {
        query: {
          page: String(query.page - 1),
        },
        remap: expect.any(Function),
      },
      {
        responseError: 'error.getAllNotificationsFetch',
        defaultError: 'error.getAllNotificationsParse',
      }
    );

    expect(result).toEqual(mockNotifications);
  });

  test('throws if getFetch fails', async () => {
    (getFetch as Mock).mockRejectedValueOnce(new Error('fail'));

    const query = { page: 1, viewed: null };

    await expect(fetchNotifications(query)).rejects.toThrow('fail');
  });
});
