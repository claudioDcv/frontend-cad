import { describe, test, expect, vi, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import usePatchReviewedContract from '.';
import { FetchStatus } from '@/constants';
import * as clientModule from './client';
import { Contract } from '@/entities/Contract.entity';

describe('usePatchReviewedContract', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should have IDLE status initially', () => {
    const { result } = renderHook(() => usePatchReviewedContract());

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBe(null);
  });

  test('should return data and SUCCESS status when API call succeeds', async () => {
    const mockContract: Contract = {
      contractId: 1,
      contractNumber: 1001,
      statusId: 1,
      securityBagCode: 'SB123',
      jewelQuantity: 10,
      totalContractValue: 10000,
      averagePurchaseValue: 1000,
      totalWeight: 5,
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      responsibleName: 'Juan Perez',
      clientName: 'Cliente Ejemplo',
      clientRut: '12345678-9',
      metadata: null,
    };

    vi.spyOn(clientModule, 'default').mockResolvedValue(mockContract);

    const { result } = renderHook(() => usePatchReviewedContract());

    await act(async () => {
      const response = await result.current.call(mockContract);
      expect(response).toEqual(mockContract);
    });

    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual(mockContract);
    expect(result.current.error).toBe(null);
  });

  test('should return error and ERROR status when API call fails', async () => {
    const errorMessage = 'API error';

    vi.spyOn(clientModule, 'default').mockRejectedValue(
      new Error(errorMessage)
    );

    const incompleteMockContract: Contract = {
      contractId: 1,
      contractNumber: 0,
      statusId: 0,
      securityBagCode: '',
      jewelQuantity: 0,
      totalContractValue: 0,
      averagePurchaseValue: 0,
      totalWeight: 0,
      startDate: '',
      endDate: '',
      responsibleName: '',
      clientName: '',
      clientRut: '',
      metadata: null,
    };

    const { result } = renderHook(() => usePatchReviewedContract());

    await act(async () => {
      await result.current.call(incompleteMockContract);
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBe(errorMessage);
  });

  test('should reset error and data with onResetError', () => {
    const { result } = renderHook(() => usePatchReviewedContract());

    act(() => {
      result.current.onResetError();
    });

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBe(null);
  });
});
