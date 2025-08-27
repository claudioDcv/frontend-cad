import { renderHook } from '@testing-library/react';
import { describe, test, expect, vi, type Mock } from 'vitest';
import useGetContract from './index';
import useAsyncCall from '@/hooks/useAsyncCall';

vi.mock('@/hooks/useAsyncCall');

describe('useGetContract', () => {
  test('should call useAsyncCall with correct args', () => {
    const mockReturn = { data: null, loading: false, error: null };

    (useAsyncCall as Mock).mockReturnValue(mockReturn);

    const { result } = renderHook(() => useGetContract());

    expect(useAsyncCall).toHaveBeenCalledWith({
      client: expect.any(Function),
      initial: null,
    });
    expect(result.current).toBe(mockReturn);
  });
});
