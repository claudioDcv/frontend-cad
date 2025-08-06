import { describe, test, expect, vi, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import usePatchResolutionInventory from '.';
import { FetchStatus } from '@/constants';
import * as clientModule from './client';
import { InventoryResolution } from '@/entities/InventoryResolution.entity';

describe('usePatchResolutionInventory', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should have IDLE status initially', () => {
    const { result } = renderHook(() => usePatchResolutionInventory());

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  test('should return data and SUCCESS status when API call succeeds', async () => {
    const mockData: InventoryResolution[] = [
      {
        id: 1,
        resolutionId: 101,
        inventoryTypeId: 201,
        weight: 1.5,
        quantity: 10,
        totalWeight: 15,
        createdBy: 1001,
        updatedBy: 1002,
      },
      {
        id: 2,
        resolutionId: 102,
        inventoryTypeId: 202,
        weight: 2.0,
        quantity: 5,
        totalWeight: 10,
        createdBy: 1003,
        updatedBy: 1004,
      },
    ];

    vi.spyOn(clientModule, 'default').mockResolvedValue(mockData);

    const { result } = renderHook(() => usePatchResolutionInventory());

    await act(async () => {
      await result.current.call('123');
    });

    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  test('should return error and ERROR status when API call fails', async () => {
    const errorMessage = 'API error';

    vi.spyOn(clientModule, 'default').mockRejectedValue(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => usePatchResolutionInventory());

    await act(async () => {
      await result.current.call('123');
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });

  test('should reset error and data with onResetError', () => {
    const { result } = renderHook(() => usePatchResolutionInventory());

    act(() => {
      result.current.onResetError();
    });

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(null);
  });
});
