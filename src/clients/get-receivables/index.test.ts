import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { FetchStatus } from '@/constants';
import useGetAllContracts from '.';
import * as clientModule from './client';
import { Receivable } from '@/entities/Receivable.entity';

vi.mock('@/utils', () => ({
  toDay: () => new Date('2025-07-18T00:00:00Z'),
}));

describe('useGetReceivables', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('returns data and SUCCESS when API call succeeds', async () => {
    const mockData: Receivable = {
      id: 0,
      contractId: '',
      createdBy: 0,
      reviewedBy: 0,
      typeId: 0,
      weight: 0,
      quantity: 0,
      operatorNote: '',
      administratorNote: '',
      averagePrice: 0,
      status: false,
      observation: '',
      createdAt: '',
      updatedAt: '',
      createdByName: '',
      reviewedByName: '',
      typeName: ''
    };

    vi.spyOn(clientModule, 'default').mockResolvedValue([mockData]);

    const { result } = renderHook(() => useGetAllContracts());

    await act(async () => {
      await result.current.call(0);
    });

    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual([mockData]);
    expect(result.current.error).toBe(null);
  });

  test('returns error and ERROR status when API call fails', async () => {
    const mockError = new Error('API call failed');
    vi.spyOn(clientModule, 'default').mockRejectedValue(mockError);

    const { result } = renderHook(() => useGetAllContracts());

    await act(async () => {
      await result.current.call(0);
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('API call failed');
  });

  test('has IDLE status initially', () => {
    const { result } = renderHook(() => useGetAllContracts());

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(null);
  });
});
