import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import * as clientModule from './client';
import { FetchStatus } from '../../utils';
import useGetAllContracts from '.';
import { PageResponse } from './types';
import { remap } from './utils';
import { ContractFormModel } from '../../pages/index/types';

const mockFilters: ContractFormModel = {
  page: 1,
  resolutionId: { label: 'Resolución 1', value: '1' },
  clientRut: '11111111-1',
  responsible: 'Juan Pérez',
};

describe('useGetAllContracts', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should return data and SUCCESS if the call is successful', async () => {
    const mockData: PageResponse = {
      content: [
        {
          resolutionId: 1,
          resolutionNumber: 100,
          resolutionBarcode: 'ABC123',
          dispatchGuideNumber: 123,
          investmentName: 'Inversión Prueba',
          branchName: 'Sucursal Central',
          closureDate: '2025-12-31',
          contractQuantity: 10,
          jewelTotalCount: 100,
          categoryName: 'Categoría A',
          stateName: 'Cerrado',
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
        pageSize: 10,
        sort: {
          sorted: false,
          empty: false,
          unsorted: true,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      sort: {
        sorted: false,
        empty: false,
        unsorted: true,
      },
    };

    vi.spyOn(clientModule, 'default').mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetAllContracts());

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

    const { result } = renderHook(() => useGetAllContracts());

    await act(async () => {
      await result.current.call(mockFilters);
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.data).toEqual({
      contracts: [],
      meta: { page: 0, count: 0 },
    });
    expect(result.current.error).toBe('API call failed');
  });

  test('should have IDLE status initially', () => {
    const { result } = renderHook(() => useGetAllContracts());

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toEqual({
      contracts: [],
      meta: { page: 0, count: 0 },
    });
    expect(result.current.error).toBe(null);
  });
});
