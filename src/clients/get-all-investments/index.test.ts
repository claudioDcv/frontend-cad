
import { describe, test, expect, vi, beforeEach } from 'vitest';
import * as clientModule from './client';
import { FetchStatus } from '../../utils';
import useGetAllInvestments from '.';
import { act, renderHook } from '@testing-library/react';

describe('useGetAllInvestments', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should return data and SUCCESS if the call is successful', async () => {
    const mockRawData = [
      {
        investmentId: 1,
        investmentCode: 'IM',
        investmentName: 'INVERSIÓN FICTICIA S.A.',
        issuerRut: '12345678-9',
        issuerBusinessName: 'INVERSIONES FICTICIAS S.A.',
        issuerBusinessActivity: 'COMPRA Y VENTA DE ACTIVOS',
        issuerAddress: 'AV. SIEMPRE VIVA 742',
        economicActivity: '411010',
      },
    ];
  
    const expectedTransformedData = [
      {
        label: 'INVERSIÓN FICTICIA S.A.',
        value: '1',
      },
    ];
  
    vi.spyOn(clientModule, 'default').mockResolvedValue(mockRawData);
  
    const { result } = renderHook(() => useGetAllInvestments());
  
    await act(async () => {
      await result.current.call();
    });
  
    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual(expectedTransformedData);
    expect(result.current.error).toBe(null);
  });
  

  test('should return error and ERROR status if the call fails', async () => {
    const mockError = new Error('API call failed');
    vi.spyOn(clientModule, 'default').mockRejectedValue(mockError);

    const { result } = renderHook(() => useGetAllInvestments());

    await act(async () => {
      await result.current.call();
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('API call failed');
  });

  test('should have IDLE status initially', () => {
    const { result } = renderHook(() => useGetAllInvestments());

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(null);
  });
});
