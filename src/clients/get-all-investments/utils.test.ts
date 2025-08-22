import { describe, test, expect } from 'vitest';
import type { Investment } from '@/entities/Investment.entity';
import type { Option } from '@/entities/Option.entity';
import { remap } from './utils';

describe('remap function', () => {
  test('should map Investment[] to Option[] correctly', () => {
    const investments: Investment[] = [
      {
        investmentId: 1,
        investmentName: 'Invest A',
        investmentCode: '',
        issuerRut: null,
        issuerBusinessName: '',
        issuerBusinessActivity: null,
        issuerAddress: null,
        economicActivity: null,
      },
      {
        investmentId: 2,
        investmentName: 'Invest B',
        investmentCode: '',
        issuerRut: null,
        issuerBusinessName: '',
        issuerBusinessActivity: null,
        issuerAddress: null,
        economicActivity: null,
      },
    ];

    const expected: Option[] = [
      { value: '1', label: 'Invest A' },
      { value: '2', label: 'Invest B' },
    ];

    expect(remap(investments)).toEqual(expected);
  });

  test('should return empty array when input is empty', () => {
    const investments: Investment[] = [];
    expect(remap(investments)).toEqual([]);
  });
});
