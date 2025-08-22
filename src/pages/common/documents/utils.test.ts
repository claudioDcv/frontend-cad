import { describe, test, expect, vi } from 'vitest';
import {
  addOptionAll,
  isEmpty,
  defaultResolutionsFormValues,
  defaultPackingListFormValues,
  defaultNotificationFormValues,
} from './utils';
import { Option } from '@/entities/Option.entity';
import { emptyOption, FIRST_PAGE } from '@/constants';
import { toDay, defaultStartDate } from '@/utils';

vi.mock('@/utils', () => ({
  toDay: () => new Date('2025-07-18T00:00:00.000Z'),
  defaultStartDate: new Date('2025-07-01T00:00:00.000Z'),
}));
describe('Utility functions', () => {
  describe('addOptionAll', () => {
    test('should prepend allOption to options array', () => {
      const options: Option[] = [{ label: 'Opt1', value: '1' }];
      const result = addOptionAll(options);
      expect(result[0]).toEqual(emptyOption);
      expect(result.slice(1)).toEqual(options);
    });

    test('should work when options is undefined', () => {
      const result = addOptionAll(undefined);
      expect(result).toEqual([emptyOption]);
    });
  });

  describe('isEmpty', () => {
    test('returns true for undefined', () => {
      expect(isEmpty(undefined)).toBe(true);
    });

    test('returns true for empty array', () => {
      expect(isEmpty([])).toBe(true);
    });

    test('returns false for non-empty array', () => {
      expect(isEmpty([1])).toBe(false);
    });
  });

  describe('defaultResolutionsFormValues', () => {
    test('returns default form values with correct range', () => {
      const result = defaultResolutionsFormValues();
      expect(result.page).toBe(FIRST_PAGE);
      expect(result.categoryId).toBe(emptyOption);
      expect(result.range).toEqual([defaultStartDate, toDay()]);
    });
  });

  describe('defaultPackingListFormValues', () => {
    test('returns default form values with correct range', () => {
      const result = defaultPackingListFormValues();
      expect(result.page).toBe(FIRST_PAGE);
      expect(result.status).toBe(emptyOption);
      expect(result.range).toEqual([defaultStartDate, toDay()]);
    });
  });

  describe('defaultNotificationFormValues', () => {
    test('returns default notification form values', () => {
      const result = defaultNotificationFormValues;
      expect(result.page).toBe(FIRST_PAGE);
    });
  });
});
