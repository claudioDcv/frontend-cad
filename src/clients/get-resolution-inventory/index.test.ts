import { describe, test, expect, vi, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import useGetResolutionInventory from '.';
import { FetchStatus } from '@/constants';
import * as clientModule from './client';
import { InventoryResolution } from '@/entities/InventoryResolution.entity';

describe('useGetResolutionInventory', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should have IDLE status initially', () => {
    const { result } = renderHook(() => useGetResolutionInventory());

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  test('should return data and SUCCESS status when API call succeeds', async () => {
    const mockData: InventoryResolution[] = [
      {
        id: 1,
        resolutionId: 101,
        weight: 1.5,
        quantity: 10,
        totalWeight: 15,
        createdBy: 1001,
        updatedBy: 1002,
        inventoryTypeId: ''
      },
      {
        id: 2,
        resolutionId: 102,
        weight: 2.0,
        quantity: 5,
        totalWeight: 10,
        createdBy: 1003,
        updatedBy: 1004,
        inventoryTypeId: ''
      },
    ];

    vi.spyOn(clientModule, 'default').mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetResolutionInventory());

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

    const { result } = renderHook(() => useGetResolutionInventory());

    await act(async () => {
      await result.current.call('123');
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });

  test('should reset error and data with onResetError', () => {
    const { result } = renderHook(() => useGetResolutionInventory());

    act(() => {
      result.current.onResetError();
    });

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  test('should replace inventory item correctly', async () => {
    const initialData: InventoryResolution[] = [
      {
        id: 1,
        resolutionId: 101,
        weight: 1.5,
        quantity: 10,
        totalWeight: 15,
        createdBy: 1001,
        updatedBy: 1002,
        inventoryTypeId: ''
      },
      {
        id: 2,
        resolutionId: 102,
        weight: 2.0,
        quantity: 5,
        totalWeight: 10,
        createdBy: 1003,
        updatedBy: 1004,
        inventoryTypeId: ''
      },
    ];

    const updatedItem: InventoryResolution = {
      id: 2,
      resolutionId: 102,
      inventoryTypeId: '202',
      weight: 2.5,
      quantity: 99,
      totalWeight: 99,
      createdBy: 1003,
      updatedBy: 1004,
    };

    vi.spyOn(clientModule, 'default').mockResolvedValue(initialData);

    const { result } = renderHook(() => useGetResolutionInventory());

    await act(async () => {
      await result.current.call('123');
    });

    act(() => {
      result.current.replaceInventoryResolution(updatedItem);
    });

    expect(result.current.data).toEqual([initialData[0], updatedItem]);
  });
});
