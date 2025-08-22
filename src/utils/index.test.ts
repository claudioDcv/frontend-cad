import { render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import * as utils from './index';
import { materialMap } from '../constants';
import type { Inventory } from '@/entities/Inventory.entity';
import type { InventoryType } from '@/entities/InventoryType.entity';

describe('Utils functions', () => {
  test('toDay returns a Date instance', () => {
    expect(utils.toDay()).toBeInstanceOf(Date);
  });

  test('toDay covers both branches', () => {
    const spy = vi.spyOn(Date, 'now').mockReturnValue(0);
    expect(utils.toDay()).toBeInstanceOf(Date);
    spy.mockRestore();
  });

  test('defaultEndDate and defaultStartDate are Date instances', () => {
    expect(utils.defaultEndDate).toBeInstanceOf(Date);
    expect(utils.defaultStartDate).toBeInstanceOf(Date);
  });

  test('isOnlyNumbersOrEmpty works correctly', () => {
    expect(utils.isOnlyNumbersOrEmpty('123')).toBe(true);
    expect(utils.isOnlyNumbersOrEmpty('')).toBe(true);
    expect(utils.isOnlyNumbersOrEmpty('abc')).toBe(false);
    expect(utils.isOnlyNumbersOrEmpty('123abc')).toBe(false);
  });

  test('parseOptionalNumber parses numbers correctly', () => {
    expect(utils.parseOptionalNumber('123')).toBe(123);
    expect(utils.parseOptionalNumber(undefined)).toBeUndefined();
    expect(utils.parseOptionalNumber('abc')).toBeUndefined();
  });

  test('cleanDate returns correct string', () => {
    expect(utils.cleanDate('2025-08-14T12:00:00Z')).toBe('2025-08-14');
    expect(utils.cleanDate(new Date('2025-08-14T12:00:00Z'))).toBe(
      '2025-08-14'
    );
    expect(utils.cleanDate()).toBe('');
  });

  test('formatDateHour returns formatted string or empty', () => {
    const date = new Date('2025-08-14T12:00:00Z');
    expect(utils.formatDateHour(date)).toMatch(
      /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/
    );
    expect(utils.formatDateHour()).toBe('');
    expect(utils.formatDateHour('invalid-date')).toBe('');
    expect(utils.formatDateHour(Date.now())).toMatch(
      /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/
    );
  });

  test('formatToDDMMYYYY works correctly', () => {
    expect(utils.formatToDDMMYYYY('2025-08-14')).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    expect(utils.formatToDDMMYYYY(undefined)).toBe('');
    expect(utils.formatToDDMMYYYY('invalid-date')).toBe('');
  });

  test('formatToFullDateHour works correctly', () => {
    expect(utils.formatToFullDateHour('2025-08-14T12:00:00Z')).toMatch(
      /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/
    );
    expect(utils.formatToFullDateHour(undefined)).toBe('');
    expect(utils.formatToFullDateHour('invalid-date')).toBe('');
    expect(utils.formatToFullDateHour(new Date().toISOString())).toMatch(
      /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/
    );
  });

  test('formatNumberWithGr formats correctly', () => {
    expect(utils.formatNumberWithGr(1234)).toBe('1234 gr');
    expect(utils.formatNumberWithGr('1234')).toBe('1234 gr');
    expect(utils.formatNumberWithGr(null)).toBe('');
    expect(utils.formatNumberWithGr('abc')).toBe('');
  });

  test('formatCurrency formats correctly', () => {
    expect(utils.formatCurrency(1234)).toMatch(/\$\d{1,3}(\.\d{3})*/);
    expect(utils.formatCurrency('1234')).toMatch(/\$\d{1,3}(\.\d{3})*/);
    expect(utils.formatCurrency(null)).toBe('');
    expect(utils.formatCurrency('abc')).toBe('');
  });

  test('preciseSum sums numbers correctly', () => {
    expect(utils.preciseSum([0.1, 0.2, 0.3])).toBeCloseTo(0.6, 10);
    expect(utils.preciseSum([0.1, 0.02, 0.003])).toBeCloseTo(0.123, 10);
    expect(utils.preciseSum([])).toBe(0);
  });

  test('pluralize returns correct string', () => {
    expect(utils.pluralize(1, 'item', 'items')).toBe('1 item');
    expect(utils.pluralize(2, 'item', 'items')).toBe('2 items');
  });

  test('sortCustom sorts array correctly', () => {
    const items = [{ id: 'b' }, { id: 'a' }, { id: 'c' }];
    const order = ['a', 'b', 'c'];
    const sorted = utils.sortCustom(items, order, (i) => i.id);
    expect(sorted.map((i) => i.id)).toEqual(['a', 'b', 'c']);
  });

  test('sortCustom handles missing indices correctly', () => {
    expect(
      utils
        .sortCustom([{ id: 'x' }, { id: 'y' }], [], (i) => i.id)
        .map((i) => i.id)
    ).toEqual(['x', 'y']);
    expect(
      utils
        .sortCustom([{ id: 'x' }, { id: 'a' }], ['a'], (i) => i.id)
        .map((i) => i.id)
    ).toEqual(['a', 'x']);
    expect(
      utils
        .sortCustom([{ id: 'a' }, { id: 'x' }], ['a'], (i) => i.id)
        .map((i) => i.id)
    ).toEqual(['a', 'x']);
    expect(
      utils
        .sortCustom(
          [{ id: 'x' }, { id: 'a' }, { id: 'y' }, { id: 'b' }],
          ['a', 'b', 'c'],
          (i) => i.id
        )
        .map((i) => i.id)
    ).toEqual(['a', 'b', 'x', 'y']);
  });

  test('filterByInventory filters correctly', () => {
    const data: Inventory[] = [
      { inventoryType: { label: 'Type1', value: '' }, weight: 0, quantity: 0 },
      { inventoryType: { label: 'Type2', value: '' }, weight: 0, quantity: 0 },
    ];
    const filtered = utils.filterByInventory(data, ['Type1']);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].inventoryType.label).toBe('Type1');
  });

  test('outputInventorySum sums quantity and weight', () => {
    const data: Inventory[] = [
      {
        inventoryType: { label: 'Type1', value: '' },
        weight: 1.5,
        quantity: 2,
      },
      {
        inventoryType: { label: 'Type2', value: '' },
        weight: 2.5,
        quantity: 3,
      },
    ];
    const result = utils.outputInventorySum(data);
    expect(result.quantity).toBe(5);
    expect(result.weight).toBe(4);
  });

  test('toOptional, orVoidString, orFalseBoolean work', () => {
    expect(utils.toOptional(null)).toBeUndefined();
    expect(utils.toOptional('value')).toBe('value');
    expect(utils.orVoidString(null)).toBe('');
    expect(utils.orVoidString('abc')).toBe('abc');
    expect(utils.orFalseBoolean(null)).toBe(false);
    expect(utils.orFalseBoolean(true)).toBe(true);
  });

  test('getStatusLabel returns label or fallback', () => {
    const options = [{ value: '1', label: 'Active' }];
    expect(utils.getStatusLabel('1', options)).toBe('Active');
    expect(utils.getStatusLabel('2', options)).toBe('2');
    expect(utils.getStatusLabel(undefined, [])).toBe('undefined');
  });

  test('filterInventoryType filters correctly', () => {
    const data: InventoryType[] = [
      { label: 'Type1', value: '1' },
      { label: 'Type2', value: '2' },
    ];
    const result = utils.filterInventoryType(data, ['Type1']);
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe('Type1');
  });

  test('sleep waits given time', async () => {
    const start = Date.now();
    await utils.sleep(50);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(50);
  });

  test('debounce delays and cancel works', async () => {
    const fn = vi.fn();
    const debounced = utils.debounce(fn, 50);
    debounced();
    expect(fn).not.toHaveBeenCalled();
    await new Promise((r) => setTimeout(r, 60));
    expect(fn).toHaveBeenCalledTimes(1);

    const fn2 = vi.fn();
    const debounced2 = utils.debounce(fn2, 50);
    debounced2();
    debounced2.cancel();
    await new Promise((r) => setTimeout(r, 60));
    expect(fn2).not.toHaveBeenCalled();
  });

  test('getMaterialType renders correctly', () => {
    const { getByText } = render(utils.getMaterialType('Label', 'invalid-id'));
    expect(getByText('Label')).toBeDefined();

    const materialId = Object.keys(materialMap)[0];
    if (materialId) {
      const { getAllByText } = render(
        utils.getMaterialType('Label', materialId)
      );
      const matches = getAllByText('Label');
      expect(matches.length).toBeGreaterThanOrEqual(1);
    }
  });

  test('getMaterial returns correct material from materialMap', () => {
    const categoryId = Object.keys(materialMap)[0];
    if (categoryId) {
      expect(utils.getMaterial(categoryId)).toBe(materialMap[categoryId]);
    }
  });

  test('getMaterial covers non-existing id', () => {
    expect(utils.getMaterial('non-existent')).toBeUndefined();
  });

  describe('Extra tests for full coverage', () => {
    test('getMaterialType covers tooltip path', () => {
      const materialId = Object.keys(materialMap)[0];
      if (materialId) {
        const { getByLabelText } = render(
          utils.getMaterialType('LabelTooltip', materialId, 'tooltip')
        );
        expect(getByLabelText('LabelTooltip')).toBeDefined();
      }
    });
  });
});
