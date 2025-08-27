import { describe, test, expect, vi, type Mock } from 'vitest';
import fetchContractJewels from './client';
import { getFetch } from '../customFetch';
import type { Jewel } from '@/entities/Jewel.entity';

vi.mock('../customFetch', () => ({
  getFetch: vi.fn(),
}));

describe('fetchContractJewels', () => {
  const mockJewels: Jewel[] = [
    {
      number: 1,
      description: 'Gold',
      family: 'AU',
      weight: 10,
      quantity: 5,
      value: 100,
    },
    {
      number: 2,
      description: 'Silver',
      family: 'AG',
      weight: 5,
      quantity: 10,
      value: 50,
    },
  ];

  test('should call getFetch with correct params', async () => {
    (getFetch as Mock).mockResolvedValueOnce(mockJewels);

    const result = await fetchContractJewels(123);

    expect(getFetch).toHaveBeenCalledWith(
      'contracts/123/jewels',
      {},
      {
        responseError: 'error.getContractJewelsFetch',
        defaultError: 'error.getContractJewelsParse',
      }
    );
    expect(result).toEqual(mockJewels);
  });

  test('should throw if getFetch fails', async () => {
    (getFetch as Mock).mockRejectedValueOnce(new Error('fail'));

    await expect(fetchContractJewels(123)).rejects.toThrow('fail');
  });
});
