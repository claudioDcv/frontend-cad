import { Inventory } from '@/entities/Inventory.entity';
import {
    toDay,
    defaultEndDate,
    defaultStartDate,
    isOnlyNumbersOrEmpty,
    parseOptionalNumber,
    cleanDate,
    formatDateHour,
    formatToDDMMYYYY,
    formatToFullDateHour,
    formatNumberWithGr,
    formatCurrency,
    preciseSum,
    pluralize,
    sortCustom,
    filterByInventory,
    outputInventorySum,
} from './index';

describe('Utils functions', () => {
    test('toDay returns today\'s date', () => {
        const today = toDay();
        expect(today).toBeInstanceOf(Date);
        expect(today.toDateString()).toBe(new Date().toDateString());
    });

    test('defaultEndDate and defaultStartDate are calculated correctly', () => {
        expect(defaultEndDate).toBeInstanceOf(Date);
        expect(defaultStartDate).toBeInstanceOf(Date);
    });

    test('isOnlyNumbersOrEmpty validates numeric strings correctly', () => {
        expect(isOnlyNumbersOrEmpty('123')).toBe(true);
        expect(isOnlyNumbersOrEmpty('')).toBe(true);
        expect(isOnlyNumbersOrEmpty('abc')).toBe(false);
        expect(isOnlyNumbersOrEmpty('123abc')).toBe(false);
    });

    test('parseOptionalNumber parses numbers correctly', () => {
        expect(parseOptionalNumber('123')).toBe(123);
        expect(parseOptionalNumber(undefined)).toBeUndefined();
        expect(parseOptionalNumber('abc')).toBeUndefined();
    });

    test('cleanDate formats dates correctly', () => {
        expect(cleanDate('2025-08-14T12:00:00Z')).toBe('2025-08-14');
        expect(cleanDate(new Date('2025-08-14T12:00:00Z'))).toBe('2025-08-14');
        expect(cleanDate()).toBe('');
    });

    test('formatDateHour formats date and time correctly', () => {
        expect(formatDateHour('2025-08-14T12:00:00Z')).toBe('14/08/2025 08:00');
        expect(formatDateHour(new Date('2025-08-14T12:00:00Z'))).toBe('14/08/2025 08:00');
        expect(formatDateHour()).toBe('');
    });

    test('formatToDDMMYYYY formats dates correctly', () => {
        expect(formatToDDMMYYYY('2025-08-14')).toBe('13/08/2025');
        expect(formatToDDMMYYYY(undefined)).toBe('');
    });

    test('formatToFullDateHour formats full date and time correctly', () => {
        expect(formatToFullDateHour('2025-08-14T12:00:00Z')).toBe('14/08/2025 08:00');
        expect(formatToFullDateHour(undefined)).toBe('');
    });

    test('formatNumberWithGr formats numbers with "gr"', () => {
        expect(formatNumberWithGr(1234)).toBe('1234 gr');
        expect(formatNumberWithGr('1234')).toBe('1234 gr');
        expect(formatNumberWithGr(null)).toBe('');
    });

    test('formatCurrency formats numbers as currency', () => {
        expect(formatCurrency(1234)).toBe('$1.234');
        expect(formatCurrency('1234')).toBe('$1.234');
        expect(formatCurrency(null)).toBe('');
    });

    test('preciseSum calculates the sum of numbers with precision', () => {
        expect(preciseSum([0.1, 0.2, 0.3])).toBeCloseTo(0.6, 10);
        expect(preciseSum([])).toBe(0);
    });

    test('pluralize returns correct singular or plural form', () => {
        expect(pluralize(1, 'item', 'items')).toBe('1 item');
        expect(pluralize(2, 'item', 'items')).toBe('2 items');
    });

    test('sortCustom sorts items based on a custom order', () => {
        const items = [{ id: 'b' }, { id: 'a' }, { id: 'c' }];
        const order = ['a', 'b', 'c'];
        const sorted = sortCustom(items, order, (item) => item.id);
        expect(sorted.map((item) => item.id)).toEqual(['a', 'b', 'c']);
    });

    test('filterByInventory filters inventory correctly', () => {
        const data: Inventory[] = [
            {
                inventoryType: {
                    label: 'Type1',
                    value: ''
                },
                weight: 0,
                quantity: 0
            },
            {
                inventoryType: {
                    label: 'Type2',
                    value: ''
                },
                weight: 0,
                quantity: 0
            },
        ];
        const inventory = ['Type1'];
        const filtered = filterByInventory(data, inventory);
        expect(filtered).toHaveLength(1);
        expect(filtered[0].inventoryType.label).toBe('Type1');
    });

    test('outputInventorySum calculates total quantity and weight', () => {
        const data: Inventory[] = [
            {
                inventoryType: {
                    label: 'Type1',
                    value: ''
                },
                weight: 0,
                quantity: 0
            },
            {
                inventoryType: {
                    label: 'Type2',
                    value: ''
                },
                weight: 0,
                quantity: 0
            },
        ];
        const result = outputInventorySum(data);
        expect(result.quantity).toBeCloseTo(0, 10);
        expect(result.weight).toBeCloseTo(0, 10);
    });
});