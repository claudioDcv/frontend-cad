import { describe, expect, it, vi, beforeEach } from 'vitest';
import useGetContractJewels from './index';
import { FetchStatus } from '@/constants';
import { Jewel } from '@/entities/Jewel.entity';
import client from './client';
import { act, renderHook } from '@testing-library/react';

vi.mock('./client', () => ({
  default: vi.fn(),
}));

const mockClient = client as unknown as ReturnType<typeof vi.fn>;

const mockJewels: Jewel[] = [
  {
    number: 1,
    description: 'Gold',
    family: 'gold',
    weight: 2.5,
    quantity: 3,
    value: 1000,
  },
];

describe('useGetContractJewels', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches and sets data successfully', async () => {
    mockClient.mockResolvedValueOnce(mockJewels);

    const { result } = renderHook(() => useGetContractJewels());

    await act(async () => {
      await result.current.call(123);
    });

    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual(mockJewels);
    expect(result.current.error).toBeNull();
  });

  it('handles error correctly', async () => {
    mockClient.mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useGetContractJewels());

    await act(async () => {
      await result.current.call(123);
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.error).toBe('fail');
    expect(result.current.data).toEqual([]);
  });

  it('resets the state', () => {
    const { result } = renderHook(() => useGetContractJewels());

    act(() => {
      result.current.reset();
    });

    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});
