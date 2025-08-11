import { describe, test, expect, vi, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import usePostResolutionSend from '.';
import { FetchStatus } from '@/constants';
import * as clientModule from './client';
import { Send } from '@/entities/Send.entity';

describe('usePostResolutionSend', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should have IDLE status initially', () => {
    const { result } = renderHook(() => usePostResolutionSend());

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  test('should return data and SUCCESS status when API call succeeds', async () => {
    const mockSend: Send = {
      success: true,
      message: 'Send completed',
      legacyId: 1,
      resolutionId: 123,
      itemsProcessed: 10,
      items: []
    };

    vi.spyOn(clientModule, 'default').mockResolvedValue(mockSend);

    const { result } = renderHook(() => usePostResolutionSend());

    await act(async () => {
      await result.current.call(mockSend);
    });

    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual(mockSend);
    expect(result.current.error).toBeNull();
  });

  test('should return error and ERROR status when API call fails', async () => {
    const errorMessage = 'API error';

    vi.spyOn(clientModule, 'default').mockRejectedValue(
      new Error(errorMessage)
    );

    const mockSend: Send = {
      success: true,
      message: 'Send completed',
      legacyId: 1,
      resolutionId: 123,
      itemsProcessed: 10,
      items: []
    };

    const { result } = renderHook(() => usePostResolutionSend());

    await act(async () => {
      await result.current.call(mockSend);
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(errorMessage);
  });

  test('should reset error and data with onResetError', () => {
    const { result } = renderHook(() => usePostResolutionSend());

    act(() => {
      result.current.onResetError();
    });

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
