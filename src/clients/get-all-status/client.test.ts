import { describe, test, expect, vi, type Mock } from 'vitest';
import fetchAllStatus from './client';
import { getFetch } from '../customFetch';
import type { Status } from '@/entities/Status.entity';
import type { Props } from './types';

vi.mock('../customFetch', () => ({
  getFetch: vi.fn(),
}));

describe('fetchAllStatus', () => {
  const mockStatuses: Status[] = [
    { statusId: 1, statusName: 'Accepted' },
    { statusId: 2, statusName: 'Rejected' },
  ];

  test('should call getFetch with correct params', async () => {
    (getFetch as Mock).mockResolvedValueOnce(mockStatuses);

    const props: Props = { tableId: 14 };
    const result = await fetchAllStatus(props);

    expect(getFetch).toHaveBeenCalledWith(
      `status?tableId=${props.tableId}`,
      {},
      {
        responseError: 'error.getAllStatusFetch',
        defaultError: 'error.getAllStatusParse',
      }
    );
    expect(result).toEqual(mockStatuses);
  });

  test('should throw if getFetch fails', async () => {
    (getFetch as Mock).mockRejectedValueOnce(new Error('fail'));

    const props: Props = { tableId: 14 };
    await expect(fetchAllStatus(props)).rejects.toThrow('fail');
  });
});
