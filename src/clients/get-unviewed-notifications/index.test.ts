import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useGetUnviewedNotifications from '.';
import { FetchStatus } from '@/constants';
import type { NotificationCountByType } from './index.type';

vi.mock('./client', () => ({
  default: vi.fn(),
}));

import client from './client';

describe('useGetUnviewedNotifications', () => {
  const mockedClient = vi.mocked(client);

  const fakeData: NotificationCountByType[] = [
    { type: 'NEW_MESSAGES', count: 3 },
    { type: 'TASKS', count: 2 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch data successfully', async () => {
    mockedClient.mockResolvedValueOnce(fakeData);

    const { result } = renderHook(() => useGetUnviewedNotifications());

    await act(() => result.current.call());

    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual(fakeData);
    expect(result.current.error).toBeNull();
    expect(mockedClient).toHaveBeenCalled();
  });
});
