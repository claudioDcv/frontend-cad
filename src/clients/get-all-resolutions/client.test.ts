import { describe, test, expect, vi, type Mock } from 'vitest';
import client from './client';
import { getFetch } from '../customFetch';
import type { Resolution } from '@/entities/Resolution.entity';
import type { Paginated } from '../types';
import { ResolutionFormModel } from '@/pages/common/documents/types';
import { emptyOption } from '@/constants';

vi.mock('../customFetch', () => ({
  getFetch: vi.fn(),
}));

describe('fetchResolutions client', () => {
  const mockResolutions: Paginated<Resolution> = {
    content: [
      {
        resolutionId: 1,
        resolutionNumber: 1001,
        barcode: 'ABC123',
        dispatchGuide: 123,
        investmentName: 'Investment A',
        locationName: 'Location A',
        closeDate: '2025-08-01',
        contractCount: 5,
        totalJewels: 10,
        categoryName: 'Gold',
        stateName: 'Closed',
        locationAddress: 'Address A',
        investmentRut: '12345678-9',
        securityBag: 'Bag A',
        statusId: 1,
        categoryId: 1,
        metadata: null,
        totalWeight: 100,
        totalPurchase: 5000,
        averagePurchase: 500,
        hasMetadata: false,
        responsible: 'Alice',
      },
    ],
    meta: { count: 1, page: 0 },
  };

  const props: ResolutionFormModel = {
    page: 1,
    categoryId: emptyOption,
    status: emptyOption,
    investment: emptyOption,
    location: emptyOption,
    range: [new Date('2025-08-01'), new Date('2025-08-31')],
    resolutionNumber: '',
  };

  test('calls getFetch with correct parameters', async () => {
    (getFetch as Mock).mockResolvedValueOnce(mockResolutions);

    const result = await client(props);

    expect(getFetch).toHaveBeenCalledWith(
      expect.stringContaining('resolutions?'),
      { remap: expect.any(Function) },
      {
        responseError: 'error.getAllResolutionsFetch',
        defaultError: 'error.getAllResolutionsParse',
      }
    );

    expect(result).toEqual(mockResolutions);
  });

  test('throws if getFetch fails', async () => {
    (getFetch as Mock).mockRejectedValueOnce(new Error('fail'));

    await expect(client(props)).rejects.toThrow('fail');
  });
});
