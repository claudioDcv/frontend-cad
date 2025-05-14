import { render, screen, } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import ModalContractDetail from './index';

const mockData = {
  id: '1',
  jewels: [
    { id: '1', label: 'Gold' },
    { id: '2', label: 'Silver' },
  ],
};

describe('ModalContractDetail', () => {
  test('renders correctly when open', () => {
    render(
      <ModalContractDetail
        open={true}
        onClose={() => {}}
        onSuccess={() => {}}
        material='Gold'
        data={mockData}
        checked={false}
      />
    );

    expect(screen.getByText('Gold')).toBeInTheDocument();
    expect(screen.getByText('Silver')).toBeInTheDocument();
  });
});