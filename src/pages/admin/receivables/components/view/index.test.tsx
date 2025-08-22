import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import View from './index';
import { Receivable } from '@/entities/Receivable.entity';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
vi.mock('@/clients/get-contract', () => ({
  default: () => ({
    status: 'success',
    data: {
      contractId: 1,
      averagePurchaseValue: 100,
      totalWeight: 10,
      totalContractValue: 1000,
      responsibleName: 'John',
      endDate: '2025-01-01',
      clientName: 'Client',
      clientRut: '1-9',
    },
    call: vi.fn(),
  })
}));
vi.mock('@/components', () => ({
  ContractSummaryCard: (props: { contract: { contractId: number } }) => <div data-testid="contract-summary">{props.contract.contractId}</div>,
  ReceivableSummaryCard: (props: { receivable: { id: number }, contractAveragePurchaseValue: number }) => <div data-testid="receivable-summary">{props.receivable.id}</div>,
}));
vi.mock('@/components/molecules/modal-header', () => ({ default: (props: { title: string, onClose: () => void }) => <div data-testid="modal-header">{props.title}</div> }));

const receivable: Receivable = {
  id: 123,
  contractId: 1,
  // ...otros campos requeridos por Receivable
} as Receivable;

describe('View', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders dialog and summary cards', () => {
    render(<View receivable={receivable} onClose={() => {}} />);
    expect(screen.getByTestId('modal-header')).toBeInTheDocument();
    expect(screen.getByTestId('contract-summary')).toHaveTextContent('1');
    expect(screen.getByTestId('receivable-summary')).toHaveTextContent('123');
  });

  it('calls onClose when buttons are clicked', () => {
    const onClose = vi.fn();
    render(<View receivable={receivable} onClose={onClose} />);
    fireEvent.click(screen.getByText('common.reject'));
    fireEvent.click(screen.getByText('common.accept'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('does not render content if receivable is null', () => {
    render(<View receivable={null} onClose={() => {}} />);
    expect(screen.queryByTestId('modal-header')).not.toBeInTheDocument();
  });
});
