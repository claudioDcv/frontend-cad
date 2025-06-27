import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import * as clientModule from './client';
import { FetchStatus } from '../../utils';
import useGetAllPackingList from '.';
import { PageResponse } from './types';
import { remap } from './utils';

const mockFilters: PackingListFormModel = {
  page: 1,
  categoryId: { label: 'TODOS', value: 'all' },
  status: { label: 'TODOS', value: 'all' },
  investment: { label: 'TODOS', value: 'all' },
  location: { label: 'TODOS', value: 'all' },
  range: [new Date(), new Date()] as [Date, Date],
  docNumber: '1234'
};

describe('useGetAllPackingList', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should return data and SUCCESS if the call is successful', async () => {
    const mockData: PageResponse = {
      content: [
        {
          packinglistId: '1',
          barcode: 'ABC123',
          dispatchNumber: '999',
          investmentName: 'INVEST',
          originLocation: 'ORIGIN',
          destinyLocation: 'DESTINY',
          creationDate: '2025-06-21T22:32:23.783Z',
          totalQuantity: 1,
          totalGrams: 2,
          documentType: 'type',
          statusId: 1,
          statusName: 'Enviado',
          categoryName: 'Cat 1',
          categoryId: ''
        },
      ],
      totalElements: 1,
      totalPages: 1,
      number: 0,
      size: 10,
      first: true,
      last: true,
      empty: false,
      numberOfElements: 1,
      pageable: {
        pageNumber: 0,
        pageSize: 0,
        sort: {
          sorted: false,
          empty: false,
          unsorted: false,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      sort: {
        sorted: true,
        empty: true,
        unsorted: false,
      },
    };

    vi.spyOn(clientModule, 'default').mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetAllPackingList());

    await act(async () => {
      await result.current.call(mockFilters);
    });

    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual(remap(mockData));
    expect(result.current.error).toBe(null);
  });

  test('should return error and ERROR status if the call fails', async () => {
    const mockError = new Error('API call failed');
    vi.spyOn(clientModule, 'default').mockRejectedValue(mockError);

    const { result } = renderHook(() => useGetAllPackingList());

    await act(async () => {
      await result.current.call(mockFilters);
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.data).toEqual({
      packingList: [],
      meta: { page: 0, count: 0 },
    });
    expect(result.current.error).toBe('API call failed');
  });

  test('should have IDLE status initially', () => {
    const { result } = renderHook(() => useGetAllPackingList());

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toEqual({
      packingList: [],
      meta: { page: 0, count: 0 },
    });
    expect(result.current.error).toBe(null);
  });
});
