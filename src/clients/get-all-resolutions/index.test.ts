import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import * as clientModule from './client';
import { FetchStatus } from '../../utils';
import useGetAllResolutions from '.';
import { PageResponse } from './types';
import { remap } from './utils';
import { ResolutionFormModel } from '../../pages/index/types';

const mockFilters: ResolutionFormModel = {
  page: 0,
  categoryId: { label: 'TODOS', value: 'all' },
  status: { label: 'TODOS', value: 'all' },
  investment: { label: 'TODOS', value: 'all' },
  location: { label: 'TODOS', value: 'all' },
  range: [new Date(), new Date()] as [Date, Date],
  resolutionNumber: '',
};

describe('useGetAllResolutions', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should return data and SUCCESS if the call is successful', async () => {
    const mockData: PageResponse = {
      content: [
        {
          resolutionId: '',
          resolutionNumber: 0,
          barcode: 'string',
          dispatchGuide: 0,
          investmentName: 'string',
          locationName: 'string',
          closeDate: '2025-05-16T15:27:40.874Z',
          contractCount: 0,
          totalJewels: 0,
          categoryName: 'string',
          statusName: 'string',
          statusId: 0,
          locationAddress: 'string',
          investmentRut: 'string',
          securityBag: 'string',
          categoryId: '',
        },
      ],
      totalElements: 1,
      totalPages: 1,
      number: 0,
      size: 10,
      first: true,
      last: true,
      empty: false,
      numberOfElements: 0,
      pageable: {
        pageNumber: 0,
        pageSize: 0,
        sort: {
          sorted: false,
          empty: false,
          unsorted: false,
        },
        offset: 0,
        paged: undefined,
        unpaged: undefined,
      },
      sort: [
        {
          sorted: true,
          empty: true,
          unsorted: false,
        },
      ],
    };

    const transformedMockData = {
      resolutions: mockData.content,
      meta: {
        page: mockData.number + 1,
        count: mockData.totalElements,
      },
    };

    vi.spyOn(clientModule, 'default').mockResolvedValue(transformedMockData);

    const { result } = renderHook(() => useGetAllResolutions());

    await act(async () => {
      await result.current.call(mockFilters);
    });

    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual(remap(mockData));
    expect([null, ''].includes(result.current.error)).toBe(true);
  });

  test('should return error and ERROR status if the call fails', async () => {
    const mockError = new Error('API call failed');
    vi.spyOn(clientModule, 'default').mockRejectedValue(mockError);

    const { result } = renderHook(() => useGetAllResolutions());

    await act(async () => {
      await result.current.call(mockFilters);
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.data).toEqual({
      resolutions: [],
      meta: { page: 0, count: 0 },
    });
    expect(result.current.error).toBe('API call failed');
  });

  test('should have IDLE status initially', () => {
    const { result } = renderHook(() => useGetAllResolutions());

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toEqual({
      resolutions: [],
      meta: { page: 0, count: 0 },
    });
    expect([null, ''].includes(result.current.error)).toBe(true);
  });
});
