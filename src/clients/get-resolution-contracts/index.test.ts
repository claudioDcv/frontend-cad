import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { FetchStatus } from '@/constants';
import useGetAllContracts from '.';
import * as clientModule from './client';
import { Contract } from '@/entities/Contract.entity';

const mockFilters: string = JSON.stringify({
  resolutionId: 1,
  clientRut: '11111111-1',
  responsible: 'Juan Pérez',
  expirationBefore: '2023-12-31',
  contractNumber: '',
});

describe('useGetAllContracts', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should return data and SUCCESS if the call is successful', async () => {
    const mockData: Contract = {
      contractId: 0,
      contractNumber: 0,
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
      cadMetadata: null,
    };

    vi.spyOn(clientModule, 'default').mockResolvedValue([mockData]);

    const { result } = renderHook(() => useGetAllContracts());

    await act(async () => {
      await result.current.call(mockFilters);
    });

    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual([mockData]);
    expect(result.current.error).toBe(null);
  });

  test('should return error and ERROR status if the call fails', async () => {
    const mockError = new Error('API call failed');
    vi.spyOn(clientModule, 'default').mockRejectedValue(mockError);

    const { result } = renderHook(() => useGetAllContracts());

    await act(async () => {
      await result.current.call(mockFilters);
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('API call failed');
  });

  test('should have IDLE status initially', () => {
    const { result } = renderHook(() => useGetAllContracts());

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(null);
  });
});
