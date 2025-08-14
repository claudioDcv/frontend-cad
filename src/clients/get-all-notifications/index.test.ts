import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { FetchStatus } from '@/constants';
import * as clientModule from './client';
import useGetAllNotifications from '.';
import { NotificationFormModel } from '@/pages/common/documents/types';
import { Paginated } from '../types';
import { Notification } from '@/entities/Notification.entity';
import { initialPaginatedData } from '../utils';

const mockFilters: NotificationFormModel = {
  page: 0,
};

describe('useGetAllNotifications', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should return data and SUCCESS if the call is successful', async () => {
    const mockData: Paginated<Notification> = {
      content: [
        {
          id: 0,
          type: 'string',
          entity: 'string',
          entityId: 0,
          userName: 'string',
          userId: 0,
          message: 'string',
          timestamp: 'string',
          viewed: false,
          viewedAt: 'string',
          viewedBy: 0,
        },
      ],
      meta: {
        page: 1,
        count: 1,
      },
    };

    vi.spyOn(clientModule, 'default').mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetAllNotifications());

    await act(async () => {
      await result.current.call(mockFilters);
    });

    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual(mockData);
    expect([null, ''].includes(result.current.error)).toBe(true);
  });

  test('should return error and ERROR status if the call fails', async () => {
    const mockError = new Error('API call failed');
    vi.spyOn(clientModule, 'default').mockRejectedValue(mockError);

    const { result } = renderHook(() => useGetAllNotifications());

    await act(async () => {
      await result.current.call(mockFilters);
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.data).toEqual(initialPaginatedData);
    expect(result.current.error).toBe('API call failed');
  });

  test('should have IDLE status initially', () => {
    const { result } = renderHook(() => useGetAllNotifications());

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toEqual(initialPaginatedData);
    expect([null, ''].includes(result.current.error)).toBe(true);
  });

  test('onResetError should clear error and reset data', () => {
    const { result } = renderHook(() => useGetAllNotifications());

    act(() => {
      result.current.onResetError();
    });

    expect(result.current.data).toEqual(initialPaginatedData);
    expect(result.current.error).toBe('');
  });
});
