import { describe, test, expect } from 'vitest';
import { diffInitialState, getDiff } from './index.utils';

vi.mock('@/utils', () => ({
  preciseSum: (nums: number[]) => nums.reduce((a, b) => a + b, 0),
}));

describe('getDiff', () => {
  test('returns initial state when no differences', () => {
    const expected = { quantity: 5, weight: 10 };
    const current = { quantity: 5, weight: 10 };

    const result = getDiff(expected, current);
    expect(result).toEqual(diffInitialState);
  });

  test('returns correct quantity difference', () => {
    const expected = { quantity: 10, weight: 10 };
    const current = { quantity: 7, weight: 10 };

    const result = getDiff(expected, current);
    expect(result).toEqual({
      ...diffInitialState,
      quantity: 3,
      isQuantity: true,
      quantityExceeded: false,
    });
  });

  test('detects exceeded quantity', () => {
    const expected = { quantity: 5, weight: 10 };
    const current = { quantity: 8, weight: 10 };

    const result = getDiff(expected, current);
    expect(result).toEqual({
      ...diffInitialState,
      quantity: 3,
      isQuantity: true,
      quantityExceeded: true,
    });
  });

  test('returns correct weight difference', () => {
    const expected = { quantity: 5, weight: 15 };
    const current = { quantity: 5, weight: 10 };

    const result = getDiff(expected, current);
    expect(result).toEqual({
      ...diffInitialState,
      weight: 5,
      isWeight: true,
      weightExceeded: false,
    });
  });

  test('detects exceeded weight', () => {
    const expected = { quantity: 5, weight: 10 };
    const current = { quantity: 5, weight: 12 };

    const result = getDiff(expected, current);
    expect(result).toEqual({
      ...diffInitialState,
      weight: 2,
      isWeight: true,
      weightExceeded: true,
    });
  });

  test('handles differences in both quantity and weight', () => {
    const expected = { quantity: 8, weight: 15 };
    const current = { quantity: 5, weight: 20 };

    const result = getDiff(expected, current);
    expect(result).toEqual({
      quantity: 3,
      weight: 5,
      isQuantity: true,
      isWeight: true,
      quantityExceeded: false,
      weightExceeded: true,
    });
  });
});
