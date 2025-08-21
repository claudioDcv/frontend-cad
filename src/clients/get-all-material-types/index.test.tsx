import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { FetchStatus } from '@/constants';
import * as clientModule from './client';
import useGetAllMaterialTypes from '.';
import { remap } from './utils';
import { Option } from '@/entities/Option.entity';
import { MaterialType } from '@/entities/MaterialType.entity';

vi.mock('@/utils', () => ({
  toDay: () => new Date('2025-07-18T00:00:00Z'),
}));

describe('useGetAllMaterialTypes', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('returns data and SUCCESS when API call succeeds', async () => {
    const mockData: Option[] = [
      {
        label: 'Category Name',
        value: '1',
      },
    ];
    vi.spyOn(clientModule, 'default').mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetAllMaterialTypes());

    await act(async () => {
      await result.current.call();
    });

    const data: MaterialType[] = [
      {
        categoryId: 1,
        categoryCode: '',
        categoryName: 'Category Name',
        measurementUnit: '',
        minimumProfitMargin: 0
      },
    ];

    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual(remap(data));
    expect(result.current.error).toBe(null);
  });

  test('returns error and ERROR status when API call fails', async () => {
    const mockError = new Error('API call failed');
    vi.spyOn(clientModule, 'default').mockRejectedValue(mockError);

    const { result } = renderHook(() => useGetAllMaterialTypes());

    await act(async () => {
      await result.current.call();
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('API call failed');
  });

  test('has IDLE status initially', () => {
    const { result } = renderHook(() => useGetAllMaterialTypes());

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(null);
  });
});
