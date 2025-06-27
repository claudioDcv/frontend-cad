import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import * as clientModule from './client';
import { FetchStatus } from '../../utils';
import useGetAllContracts from '.';
import { ContractFormModel } from '../../pages/index/types';
import { Contract } from './types';

const mockFilters: ContractFormModel = {
  resolutionId: '1',
  clientRut: '11111111-1',
  responsible: 'Juan Pérez',
};
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
      clientRut: ''
    };

    vi.spyOn(clientModule, 'default').mockResolvedValue([mockData]);

    const { result } = renderHook(() => useGetAllContracts());

    await act(async () => {
      await result.current.call(mockFilters);
    });

    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.contracts).toEqual([mockData]);
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
    expect(result.current.contracts).toEqual([]);
    expect(result.current.error).toBe('API call failed');
  });

  test('should have IDLE status initially', () => {
    const { result } = renderHook(() => useGetAllContracts());

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.contracts).toEqual([]);
    expect(result.current.error).toBe(null);
  });
});
