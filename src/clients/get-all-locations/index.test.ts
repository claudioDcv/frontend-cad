import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { FetchStatus } from '@/constants';
import useGetAllBranches from '.';
import * as clientModule from './client';
import { remap } from './utils';
import { Option } from '@/entities/Option.entity';
import { Location } from '@/entities/Location.entity';

describe('useGetAllStatus', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should return data and SUCCESS if the call is successful', async () => {
    const mockData: Option[] = [{
      label: 'Location 1',
      value: '1',
    }];
    vi.spyOn(clientModule, 'default').mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetAllBranches());

    await act(async () => {
      await result.current.call({ investmentId: '123', status: null });
    });

    const locations: Location[] = [{
      locationId: 1,
      locationNumber: 100,
      locationCode: 'LOC-001',
      locationName: 'Location 1',
      locationAlias: 'Loc 1',
      locationAddress: '123 Main St',
      locationManager: 'John Doe',
      managerEmail: 'john.doe@example.com',
      managerPhone: '555-1234',
    }];
    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual(remap(locations));
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
