import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { FetchStatus } from '@/constants';
import * as clientModule from './client';
import usePatchSendResolution from '.';
import { ResolutionSendResponse } from '@/entities/ResolutionSendResonse.entity';

const mockResolution: ResolutionSendResponse = {
  message: "OK: Inventory successfully processed. Generated ID: 196, CXC Records: 0",
  resolutionId: "306402033"
};

describe('usePatchSendResolution', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should have IDLE status initially', () => {
    const { result } = renderHook(() => usePatchSendResolution());
    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  test('should return data and SUCCESS status on successful call', async () => {
    vi.spyOn(clientModule, 'default').mockResolvedValue({
      message: "OK: Inventory successfully processed. Generated ID: 196, CXC Records: 0",
      resolutionId: "306402033"
    });

    const { result } = renderHook(() => usePatchSendResolution());

    await act(async () => {
      const response = await result.current.call({
        resolutionId: 306402033,
        inventories: [],
      });
      expect(response).toEqual(mockResolution);
    });

    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual(mockResolution);
    expect(result.current.error).toBeNull();
  });

  test('should return error and ERROR status on failed call', async () => {
    const errorMessage = 'API call failed';
    vi.spyOn(clientModule, 'default').mockRejectedValue(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => usePatchSendResolution());

    await act(async () => {
      await result.current.call({
        resolutionId: 306402033,
        inventories: [],
      });
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBe(errorMessage);
  });

  test('onResetError should reset data and error', () => {
    const { result } = renderHook(() => usePatchSendResolution());

    act(() => {
      result.current.reset();
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });
});
