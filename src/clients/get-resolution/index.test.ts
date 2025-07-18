import { renderHook, act } from '@testing-library/react';
import { vi, beforeEach, describe, test, expect } from 'vitest';
import useGetResolution from '.';
import client from './client';
import { FetchStatus } from '@/constants';

vi.mock('./client', () => ({
  __esModule: true,
  default: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

const mockedClient = client as unknown as ReturnType<typeof vi.fn> & {
  mockResolvedValue: (value: unknown) => void;
};

describe('useGetResolution hook', () => {
  test('starts with idle status, data and no error', () => {
    const { result } = renderHook(() => useGetResolution());
    expect(result.current.status).toBe(FetchStatus.IDLE);
    expect(result.current.data).toBeDefined();
    expect(result.current.error).toBe('');
  });

  test('fetches successfully and updates state', async () => {
    const mockResponse = { id: '123', name: 'Test Resolution' };
    mockedClient.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGetResolution());

    await act(async () => {
      await result.current.call('123');
    });

    expect(result.current.status).toBe(FetchStatus.SUCCESS);
    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.error).toBe('');
  });

  test('handles fetch failure correctly', async () => {
    mockedClient.mockResolvedValue(null);

    const { result } = renderHook(() => useGetResolution());

    await act(async () => {
      await result.current.call('123');
    });

    expect(result.current.status).toBe(FetchStatus.ERROR);
    expect(result.current.error).toBe('error.resolutionNotFound');
  });

  test('resets error and data on onResetError call', () => {
    const { result } = renderHook(() => useGetResolution());

    act(() => {
      result.current.onResetError();
    });

    expect(result.current.error).toBe('');
    expect(result.current.data).toEqual(expect.any(Object));
  });
});
