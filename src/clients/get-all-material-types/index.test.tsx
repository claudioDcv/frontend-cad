import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import useGetAllMaterialTypes from './index';
import * as clientModule from './client';
import { Option } from '@/entities/Option.entity';

describe('useGetAllMaterialTypes', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('returns data and SUCCESS when client resolves', async () => {
    const mockData: Option[] = [
      { label: 'GOLD', value: '1' },
      { label: 'SILVER', value: '2' },
    ];

    vi.spyOn(clientModule, 'default').mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetAllMaterialTypes());

    await act(async () => {
      await result.current.call();
    });

    expect(result.current.status).toBe('success');
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  test('sets ERROR status when client rejects', async () => {
    const error = new Error('API failed');
    vi.spyOn(clientModule, 'default').mockRejectedValue(error);

    const { result } = renderHook(() => useGetAllMaterialTypes());

    await act(async () => {
      await result.current.call();
    });

    expect(result.current.status).toBe('error');
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('API failed');
  });

  test('has IDLE status initially', () => {
    const { result } = renderHook(() => useGetAllMaterialTypes());

    expect(result.current.status).toBe('idle');
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});
