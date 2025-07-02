import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import ModalContractDetail from './index';

const mockData = {
  contractId: 1,
  jewels: [
    {
      number: 123,
      description: 'Gold Ring',
      family: 'Jewelry',
      weight: 15.5,
      quantity: 2,
      value: 500,
    },
    {
      number: 456,
      description: 'Silver Necklace',
      family: 'Jewelry',
      weight: 20.3,
      quantity: 1,
      value: 300,
    },
  ],
};

describe('ModalContractDetail', () => {
  test('renders correctly when open', () => {
    render(
      <ModalContractDetail
        open={true}
        onClose={() => {}}
        onSuccess={() => {}}
        material="Gold"
        data={mockData}
        checked={false}
      />
    );

    expect(screen.getByText('Gold Ring')).toBeInTheDocument();
    expect(screen.getByText('Silver Necklace')).toBeInTheDocument();
  });
});
