import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Contract } from '@/entities/Contract.entity';
import ModalContractDetail from './index';

const mockContract: Contract = {
  contractId: 0,
  contractNumber: 0,
  securityBagCode: '',
  jewelQuantity: 0,
  totalContractValue: 0,
  averagePurchaseValue: 0,
  totalWeight: 0,
  startDate: '',
  endDate: '',
  responsibleName: 'John Doe',
  clientName: 'Jane Smith',
  clientRut: '12345678-9',
  cadMetadata: null,
};

describe('ModalContractDetail', () => {
  test('renders contract details correctly when open', () => {
    render(
      <ModalContractDetail
        onClose={() => {}}
        onSuccess={() => {}}
        material="Gold"
        contract={mockContract}
        i18n={{
          label: 'Label',
          weight: 'Contract weight',
          totalContractValue: 'Purchase amount',
          averagePurchaseValue: 'Average purchase',
          responsible: 'Responsible',
          expiration: 'Expiration',
          client: 'Client',
          clientRut: 'Client RUT',
        }}
      />
    );

    expect(screen.getByText(/label/i)).toBeInTheDocument();

    expect(screen.getByText(/contract weight/i)).toBeInTheDocument();
    expect(screen.getByText(/0 gr/i)).toBeInTheDocument();
    expect(screen.getAllByText('$0').length).toBeGreaterThan(0);
  });
});
