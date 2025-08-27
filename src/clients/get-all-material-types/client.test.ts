import { describe, test, expect, vi, beforeEach } from 'vitest';
import client from './client';
import * as customFetch from '../customFetch';
import { Option } from '@/entities/Option.entity';
import { allowedMaterialType } from '@/constants';

describe('client', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('returns only allowed material types', async () => {
    const mockData: Option[] = [
      { label: 'GOLD', value: '1' },
      { label: 'SILVER', value: '2' },
      { label: 'EXCLUSIVE BRAND', value: '4' },
    ];

    vi.spyOn(customFetch, 'getFetch').mockResolvedValue(mockData);

    const result = await client();

    const expected = mockData.filter((item) =>
      allowedMaterialType.includes(Number(item.value))
    );

    expect(result).toEqual(expected);
    expect(customFetch.getFetch).toHaveBeenCalledOnce();
  });

  test('propagates error if getFetch fails', async () => {
    const error = new Error('API error');
    vi.spyOn(customFetch, 'getFetch').mockRejectedValue(error);

    await expect(client()).rejects.toThrow('API error');
  });
});
