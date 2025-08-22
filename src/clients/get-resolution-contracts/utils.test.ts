import { describe, test, expect } from 'vitest';

import type { Contract } from '@/entities/Contract.entity';
import * as utils from '@/utils';
import { remap } from './utils';

describe('remap function for Contract', () => {
  test('should map Contract[] and set defaults correctly', () => {
    const contracts: Contract[] = [
      {
        contractId: 0,
        contractNumber: 0,
        statusId: 0,
        securityBagCode: '',
        jewelQuantity: 0,
        totalContractValue: 0,
        averagePurchaseValue: 0,
        totalWeight: 0,
        startDate: '',
        endDate: '',
        responsibleName: '',
        clientName: '',
        clientRut: '',
        metadata: null,
      },
    ];

    const spy = vi
      .spyOn(utils, 'formatToDDMMYYYY')
      .mockImplementation((date) => `formatted-${date}`);

    const result = remap(contracts);

    expect(result).toEqual([
      {
        contractId: 0,
        contractNumber: 0,
        statusId: 0,
        securityBagCode: '',
        jewelQuantity: 0,
        totalContractValue: 0,
        averagePurchaseValue: 0,
        totalWeight: 0,
        startDate: '',
        endDate: 'formatted-',
        responsibleName: '',
        clientName: '',
        clientRut: '',
        metadata: null,
      },
    ]);

    spy.mockRestore();
  });

  test('should return empty array if input is empty', () => {
    expect(remap([])).toEqual([]);
  });
});
