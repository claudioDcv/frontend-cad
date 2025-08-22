import { describe, test, expect } from 'vitest';
import { addExtraVoidData } from './index.utils';

describe('addExtraVoidData', () => {
  test('returns empty array if data is undefined', () => {
    const result = addExtraVoidData(undefined, 5);
    expect(result).toEqual([]);
  });

  test('fills with empty objects if data length is less than itemsPerPage', () => {
    const data = [{ id: 1 }, { id: 2 }];
    const result = addExtraVoidData(data, 5);
    expect(result).toHaveLength(5);
    expect(result.slice(0, 2)).toEqual(data);
    expect(result.slice(2)).toEqual([{}, {}, {}]);
  });

  test('returns same array if data length equals itemsPerPage', () => {
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = addExtraVoidData(data, 3);
    expect(result).toHaveLength(3);
    expect(result).toEqual(data);
  });

  test('does not remove elements if data length exceeds itemsPerPage', () => {
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const result = addExtraVoidData(data, 3);
    expect(result).toHaveLength(4);
    expect(result).toEqual(data);
  });
});
