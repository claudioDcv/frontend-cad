import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import * as clientModule from './client';
import { FetchStatus } from '../../utils';
import useGetAllResolutions from '.';

describe('useGetAllStatus', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should return data and SUCCESS if the call is successful', async () => {
    const mockData = [
        {
          id: 1,
          number: 1001,
          code: '01-00',
          name: 'Santiago',
          alias: 'Santiago1',
          address: 'Santiago, Chile',
          manager: 'Juan',
          email: 'john@example.com',
          phone: '123456789',
        },
      ];
      
    vi.spyOn(clientModule, 'default').mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetAllResolutions());

    await act(async () => {
      await result.current.call();
    });

    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  test('should return error and ERROR status if the call fails', async () => {
    const mockError = new Error('API call failed');
    vi.spyOn(clientModule, 'default').mockRejectedValue(mockError);

    const { result } = renderHook(() => useGetAllResolutions());

    await act(async () => {
      await result.current.call();
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('API call failed');
  });

  test('should have IDLE status initially', () => {
    const { result } = renderHook(() => useGetAllResolutions());

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(null);
  });
});