import { describe, test, expect, vi, Mock } from 'vitest';
import { getFetch } from '../customFetch';
import getAllInventoryTypes from './client';
import { remap } from './utils';

vi.mock('../customFetch', () => ({
  __esModule: true,
  getFetch: vi.fn(),
}));

describe('getAllInventoryTypes', () => {
  test('calls getFetch with correct arguments', async () => {
    const mockData = [{ id: 1, name: 'Type A' }];
    (getFetch as Mock).mockResolvedValueOnce(mockData);

    const result = await getAllInventoryTypes();

    expect(getFetch).toHaveBeenCalledWith(
      'inventory-types/all',
      { remap },
      {
        responseError: 'error.getAllInventoryTypesFetch',
        defaultError: 'error.getAllInventoryTypesParse',
      }
    );

    expect(result).toEqual(mockData);
  });

  test('propagates error if getFetch rejects', async () => {
    (getFetch as Mock).mockRejectedValueOnce(new Error('network error'));

    await expect(getAllInventoryTypes()).rejects.toThrow('network error');
  });
});
