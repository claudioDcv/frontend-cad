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

    vi.spyOn(clientModule, 'default').mockResolvedValue({
      content: [mockData],
      meta: {
        count: 1,
        page: 1,
      },
    });

    const { result } = renderHook(() => useGetAllContracts());

    await act(async () => {
      await result.current.call({
        resolutionId: 0,
        size: 15,
        page: 1,
      });
    });

    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual({
      "content": [
        {
          "administratorNote": "",
          "averagePrice": 0,
          "contractId": "",
          "createdAt": "",
          "createdBy": 0,
          "createdByName": "",
          "id": 0,
          "observation": "",
          "operatorNote": "",
          "quantity": 0,
          "reviewedBy": 0,
          "reviewedByName": "",
          "status": false,
          "typeId": 0,
          "typeName": "",
          "updatedAt": "",
          "weight": 0,
        },
      ],
      "meta": {
        "count": 1,
        "page": 1,
      },
    });
    expect(result.current.error).toBe(null);
  });

  test('returns error and ERROR status when API call fails', async () => {
    const mockError = new Error('API call failed');
    vi.spyOn(clientModule, 'default').mockRejectedValue(mockError);

    const { result } = renderHook(() => useGetAllContracts());

    await act(async () => {
      await result.current.call({
        size: 15,
        page: 1,
      });
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.data).toEqual({
      "content": [],
      "meta": {
        "count": 0,
        "page": 0,
      },
    });
    expect(result.current.error).toBe('API call failed');
  });

  test('has IDLE status initially', () => {
    const { result } = renderHook(() => useGetAllContracts());

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toEqual({
      "content": [],
      "meta": {
        "count": 0,
        "page": 0,
      },
    });
    expect(result.current.error).toBe(null);
  });
});
