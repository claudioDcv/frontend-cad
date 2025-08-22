import { describe, test, expect } from 'vitest';
import type { Location } from '@/entities/Location.entity';
import { remap } from './utils';

describe('remap function for Location', () => {
  test('should map Location[] to { label, value }[] correctly', () => {
    const locations: Location[] = [
      {
        locationId: 10,
        locationName: 'Santiago',
        locationNumber: 0,
        locationCode: '',
        locationAlias: '',
        locationAddress: '',
        locationManager: '',
        managerEmail: null,
        managerPhone: null,
      },
      {
        locationId: 20,
        locationName: 'Valparaíso',
        locationNumber: 0,
        locationCode: '',
        locationAlias: '',
        locationAddress: '',
        locationManager: '',
        managerEmail: null,
        managerPhone: null,
      },
    ];

    const expected = [
      { value: '10', label: 'Santiago' },
      { value: '20', label: 'Valparaíso' },
    ];

    expect(remap(locations)).toEqual(expected);
  });

  test('should return empty array when input is empty', () => {
    const locations: Location[] = [];
    expect(remap(locations)).toEqual([]);
  });
});
