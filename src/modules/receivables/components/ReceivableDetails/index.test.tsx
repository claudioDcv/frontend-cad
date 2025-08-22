import { describe, test, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ReceivableDetails from './index';
import useGetContract from '@/clients/get-contract';
import { FetchStatus } from '@/constants';
import { Receivable } from '@/entities/Receivable.entity';

vi.mock('@/clients/get-contract', () => ({
  default: vi.fn(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@/components', () => ({
  ContractSummaryCard: vi.fn(() => <div>Mocked ContractSummaryCard</div>),
  ReceivableSummaryCard: vi.fn(() => <div>Mocked ReceivableSummaryCard</div>),
}));

const mockReceivable: Receivable = {
  id: 1,
  contractId: 101,
} as Receivable;

const mockContractData = {
  id: 101,
};

describe('ReceivableDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render LinearProgress when contract is loading', () => {
    (useGetContract as Mock).mockReturnValue({
      status: FetchStatus.LOADING,
      data: null,
      call: vi.fn(),
    });

    render(<ReceivableDetails receivable={mockReceivable} />);

    const linearProgress = screen.getByRole('progressbar');
    expect(linearProgress).toBeInTheDocument();

    expect(
      screen.queryByText('accountsReceivable.contractTitle')
    ).not.toBeInTheDocument();
  });

  test('should render details when contract is successfully loaded', async () => {
    (useGetContract as Mock).mockReturnValue({
      status: FetchStatus.SUCCESS,
      data: mockContractData,
      call: vi.fn(),
    });

    render(<ReceivableDetails receivable={mockReceivable} />);

    await waitFor(() => {
      expect(
        screen.getByText('accountsReceivable.contractTitle')
      ).toBeInTheDocument();
      expect(
        screen.getByText('accountsReceivable.receivableDetails')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Mocked ContractSummaryCard')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Mocked ReceivableSummaryCard')
      ).toBeInTheDocument();
    });
  });

  test('should call the contract hook with the correct contractId on mount', () => {
    const mockCall = vi.fn();

    (useGetContract as Mock).mockReturnValue({
      status: FetchStatus.IDLE,
      data: null,
      call: mockCall,
    });

    render(<ReceivableDetails receivable={mockReceivable} />);

    expect(mockCall).toHaveBeenCalledWith(mockReceivable.contractId);
  });
});
