import { describe, test, expect, vi, type Mock } from 'vitest';
import { renderHook } from '@testing-library/react';
import useGetAllStatus from './index';
import useAsyncCall from '@/hooks/useAsyncCall';
import client from './client';
import { remap } from './utils';
import type { Option } from '@/entities/Option.entity';
import type { Props } from './types';

vi.mock('@/hooks/useAsyncCall');
vi.mock('./client');
vi.mock('./utils', () => ({
  remap: vi.fn((x) => x),
}));

describe('useGetAllStatus', () => {
  test('should call useAsyncCall with correct args', () => {
    const mockReturn = { data: [], loading: false, error: null };
    (useAsyncCall as Mock).mockReturnValue(mockReturn);

    const { result } = renderHook(() => useGetAllStatus());

    expect(useAsyncCall).toHaveBeenCalledWith({
      client: expect.any(Function),
      initial: [],
    });
    expect(result.current).toBe(mockReturn);
  });

  test('client wrapper should call client and remap', async () => {
    const props: Props = { tableId: 14 };
    const mockData: Option[] = [{ value: '1', label: 'Accepted' }];
    (client as Mock).mockResolvedValue(mockData);

    const asyncClient = (useAsyncCall as Mock).mock.calls[0][0].client;
    const result = await asyncClient(props);

    expect(client).toHaveBeenCalledWith(props);
    expect(remap).toHaveBeenCalledWith(mockData);
    expect(result).toEqual(mockData);
  });
});
