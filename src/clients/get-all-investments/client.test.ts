import { describe, test, expect, vi, Mock } from 'vitest';
import { getFetch } from '../customFetch';
import getAllInvestments from './client';
import { remap } from './utils';

vi.mock('../customFetch', () => ({
  __esModule: true,
  getFetch: vi.fn(),
}));

describe('getAllInvestments', () => {
  test('calls getFetch con los argumentos correctos', async () => {
    const mockData = [{ id: 1, name: 'Investment A' }];
    (getFetch as Mock).mockResolvedValueOnce(mockData);

    const result = await getAllInvestments();

    expect(getFetch).toHaveBeenCalledWith(
      'investments',
      { remap },
      {
        responseError: 'error.getAllInvestmentsFetch',
        defaultError: 'error.getAllInvestmentsParse',
      }
    );

    expect(result).toEqual(mockData);
  });

  test('propaga el error si getFetch rechaza', async () => {
    (getFetch as Mock).mockRejectedValueOnce(new Error('network error'));

    await expect(getAllInvestments()).rejects.toThrow('network error');
  });
});
