import { describe, test, expect, vi, beforeEach } from 'vitest';
import { FetchStatus } from '@/constants';
import * as clientModule from './client';
import useGetAllInventoryTypes from '.';
import { act, renderHook } from '@testing-library/react';

describe('useGetAllInventoryTypes', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('returns data and SUCCESS when API call succeeds', async () => {
    const mockRawData = [
      {
        id: 1,
        code: 'IT001',
        name: 'anillo',
      },
    ];

    const expectedTransformedData = [
      {
        label: 'anillo',
        value: '1',
      },
    ];

    vi.spyOn(clientModule, 'default').mockResolvedValue(mockRawData);

    const { result } = renderHook(() => useGetAllInventoryTypes());

    await act(async () => {
      await result.current.call();
    });

    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual(expectedTransformedData);
    expect(result.current.error).toBe(null);
  });

  test('returns error and ERROR status when API call fails', async () => {
    const mockError = new Error('API call failed');
    vi.spyOn(clientModule, 'default').mockRejectedValue(mockError);

    const { result } = renderHook(() => useGetAllInventoryTypes());

    await act(async () => {
      await result.current.call();
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('API call failed');
  });

  test('has IDLE status initially', () => {
    const { result } = renderHook(() => useGetAllInventoryTypes());

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(null);
  });
});
