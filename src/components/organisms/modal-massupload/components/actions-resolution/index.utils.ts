import { preciseSum } from '@/utils';

export const diffInitialState = {
  quantity: 0,
  weight: 0,
  quantityExceeded: false,
  weightExceeded: false,
  isQuantity: false,
  isWeight: false,
};

export const getDiff = (
  expected: { quantity: number; weight: number },
  current: { quantity: number; weight: number }
) => {
  const resolve = { ...diffInitialState };
  const diffQuantity = preciseSum([expected.quantity, -current.quantity]);
  const diffWeight = preciseSum([expected.weight, -current.weight]);

  if (diffQuantity !== 0) {
    resolve.isQuantity = true;
    resolve.quantityExceeded = diffQuantity < 0;
    resolve.quantity = Math.abs(diffQuantity);
  }

  if (diffWeight !== 0) {
    resolve.isWeight = true;
    resolve.weightExceeded = diffWeight < 0;
    resolve.weight = Math.abs(diffWeight);
  }

  return resolve;
};
