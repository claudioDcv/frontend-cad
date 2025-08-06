import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { FetchStatus } from '@/constants';
import * as clientModule from './client';
import usePatchResolutionResolve from '.';
import { Resolution } from '@/entities/Resolution.entity';

const mockResolution: Resolution = {
  resolutionId: 0,
  resolutionNumber: 0,
  barcode: '',
  dispatchGuide: 0,
  investmentName: '',
  locationName: '',
  closeDate: '',
  contractCount: 0,
  totalJewels: 0,
  categoryName: '',
  stateName: '',
  locationAddress: '',
  investmentRut: '',
  securityBag: '',
  statusId: 0,
  categoryId: 0,
  metadata: null,
  hasMetadata: false,
  totalWeight: 0,
  totalPurchase: 0,
  averagePurchase: 0,
};

describe('usePatchResolutionResolve', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should have IDLE status initially', () => {
    const { result } = renderHook(() => usePatchResolutionResolve());
    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  test('should return data and SUCCESS status on successful call', async () => {
    vi.spyOn(clientModule, 'default').mockResolvedValue(mockResolution);

    const { result } = renderHook(() => usePatchResolutionResolve());

    await act(async () => {
      const response = await result.current.call(mockResolution);
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

    const { result } = renderHook(() => usePatchResolutionResolve());

    await act(async () => {
      await result.current.call(mockResolution);
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBe(errorMessage);
  });

  test('onResetError should reset data and error', () => {
    const { result } = renderHook(() => usePatchResolutionResolve());

    act(() => {
      result.current.onResetError();
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });
});
