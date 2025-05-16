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
        resolutionId: 0,
        resolutionNumber: 0,
        resolutionBarcode: 'string',
        dispatchGuideNumber: 0,
        investmentName: 'string',
        branchName: 'string',
        closureDate: '2025-05-16T15:27:40.874Z',
        contractQuantity: 0,
        jewelTotalCount: 0,
        categoryName: 'string',
        stateName: 'string',
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
