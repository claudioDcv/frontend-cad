import { describe, test, expect, vi, type Mock } from 'vitest';
import fetchContract from './client';
import { getFetch } from '../customFetch';
import type { Contract } from '@/entities/Contract.entity';

vi.mock('../customFetch', () => ({
  getFetch: vi.fn(),
}));

describe('fetchContract', () => {
  const mockContract: Contract = {
    contractId: 1,
    contractNumber: 123,
    statusId: 0,
    securityBagCode: 'ABC',
    jewelQuantity: 10,
    totalContractValue: 1000,
    averagePurchaseValue: 100,
    totalWeight: 500,
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    responsibleName: 'John Doe',
    clientName: 'Jane Smith',
    clientRut: '12345678-9',
    metadata: null,
  };

  test('should call getFetch with correct params', async () => {
    (getFetch as Mock).mockResolvedValueOnce(mockContract);

    const result = await fetchContract(1);

    expect(getFetch).toHaveBeenCalledWith(
      'contracts/1',
      {},
      {
        responseError: 'error.getContractFetch',
        defaultError: 'error.getContractParse',
      }
    );
    expect(result).toEqual(mockContract);
  });

  test('should throw if getFetch fails', async () => {
    (getFetch as Mock).mockRejectedValueOnce(new Error('fail'));

    await expect(fetchContract(2)).rejects.toThrow('fail');
  });
});
