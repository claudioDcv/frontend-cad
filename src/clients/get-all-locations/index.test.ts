import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import * as clientModule from './client';
import { FetchStatus } from '../../utils';
import useGetAllBranches from '.';
import { remap } from './utils';

describe('useGetAllStatus', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should return data and SUCCESS if the call is successful', async () => {
    const mockData = [
      {
        locationId: 1,
        locationNumber: 101,
        locationCode: 'LOC-001',
        locationName: 'Sucursal Santiago Centro',
        locationAlias: 'STGO-CENTRO',
        locationAddress: 'Av. Libertador Bernardo O’Higgins 123',
        locationManager: 'Juan Pérez',
        managerEmail: 'juan.perez@empresa.cl',
        managerPhone: '+56912345678',
      },
    ];
    vi.spyOn(clientModule, 'default').mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetAllBranches());

    await act(async () => {
      await result.current.call({ investmentId: '123', status: null });
    });

    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual(remap(mockData));
    expect(result.current.error).toBe(null);
  });

  test('should return error and ERROR status if the call fails', async () => {
    const mockError = new Error('API call failed');
    vi.spyOn(clientModule, 'default').mockRejectedValue(mockError);

    const { result } = renderHook(() => useGetAllBranches());

    await act(async () => {
      await result.current.call({ investmentId: '123', status: null });
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('API call failed');
  });

  test('should have IDLE status initially', () => {
    const { result } = renderHook(() => useGetAllBranches());

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(null);
  });
});
