import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import ModalContractDetail from './index';
import { Contract } from '@/entities/Contract.entity';
import { FetchStatus } from '@/constants';

const mockReset = vi.fn();
const mockCall = vi.fn();
const mockPatchCall = vi.fn().mockResolvedValue({ success: true });

const mockUseGetContractJewels = {
  call: mockCall,
  reset: mockReset,
  data: [{ jewelId: 1, name: 'Silver' }],
  status: FetchStatus.IDLE,
};

vi.mock('@/clients/get-contract-jewels', () => ({
  __esModule: true,
  default: () => mockUseGetContractJewels,
}));

vi.mock('@/clients/patch-reviewed-contract', () => ({
  __esModule: true,
  default: () => ({
    call: mockPatchCall,
    status: FetchStatus.IDLE,
  }),
}));

vi.mock('../../molecules/material-type', () => ({
  MaterialType: (props: { material: string; label: string }) => (
    <div>
      {props.material} - {props.label}
    </div>
  ),
}));

vi.mock('../contract-summary-card', () => ({
  default: (props: { contract: { contractId: number } }) => (
    <div>ContractSummaryCard {props.contract.contractId}</div>
  ),
}));

vi.mock('../../organisms/table', () => ({
  default: (props: { rows: { name: string }[] }) => (
    <table>
      <tbody>
        {props.rows.map((row, idx) => (
          <tr key={idx}>
            <td>{row.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

vi.mock('@/components/organisms/contract-note', () => ({
  default: (props: {
    onClose: () => void;
    onSuccess: (data: { note: string; reviewed: boolean }) => void;
  }) => (
    <>
      <div>ContractNote</div>
      <button onClick={props.onClose}>Cerrar</button>
      <button onClick={() => props.onSuccess({ note: 'ok', reviewed: true })}>
        Success
      </button>
    </>
  ),
}));

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    Dialog: ({
      children,
      open,
    }: {
      children: React.ReactNode;
      open: boolean;
    }) => (open ? <div>{children}</div> : null),
  };
});

const mockContract: Contract = {
  contractId: 1,
  contractNumber: 123,
  securityBagCode: 'ABC',
  jewelQuantity: 10,
  totalContractValue: 1000,
  averagePurchaseValue: 100,
  totalWeight: 500,
  startDate: '2025-01-01',
  endDate: '2025-12-31',
  responsibleName: 'John Doe',
  clientName: 'Jane Smith',
  clientRut: '12345678-9',
  metadata: null,
  statusId: 0,
};

beforeEach(() => {
  mockCall.mockClear();
  mockReset.mockClear();
  mockPatchCall.mockClear();
  mockUseGetContractJewels.data = [{ jewelId: 1, name: 'Silver' }];
  mockUseGetContractJewels.status = FetchStatus.IDLE;
});

describe('ModalContractDetail', () => {
  test('renders correctly with a contract', () => {
    render(
      <ModalContractDetail
        onClose={() => {}}
        onSuccess={() => {}}
        material="Gold"
        contract={mockContract}
        i18n={{ label: 'Test Label' }}
      />
    );

    expect(screen.getByText(/Gold/i)).toBeInTheDocument();
    expect(screen.getByText(/ContractSummaryCard 1/i)).toBeInTheDocument();
    expect(screen.getByText(/ContractNote/i)).toBeInTheDocument();

    const table = screen.getByRole('table');
    expect(within(table).getByText('Silver')).toBeInTheDocument();
  });

  test('renders correctly with i18n undefined (coverage for spread)', () => {
    render(
      <ModalContractDetail
        onClose={() => {}}
        onSuccess={() => {}}
        material="Gold"
        contract={mockContract}
      />
    );
    expect(screen.getByText(/Gold/i)).toBeInTheDocument();
  });

  test('does not render children if contract is null', () => {
    render(
      <ModalContractDetail
        onClose={() => {}}
        onSuccess={() => {}}
        material="Gold"
        contract={null}
      />
    );
    expect(screen.queryByText(/ContractNote/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ContractSummaryCard/i)).not.toBeInTheDocument();
  });

  test('handleClose calls reset and onClose', () => {
    const mockOnClose = vi.fn();
    render(
      <ModalContractDetail
        onClose={mockOnClose}
        onSuccess={() => {}}
        material="Gold"
        contract={mockContract}
      />
    );
    fireEvent.click(screen.getByText('Cerrar'));
    expect(mockReset).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('handleSuccess calls patchReviewedContract and onSuccess', async () => {
    const mockOnSuccess = vi.fn();
    render(
      <ModalContractDetail
        onClose={() => {}}
        onSuccess={mockOnSuccess}
        material="Gold"
        contract={mockContract}
      />
    );
    fireEvent.click(screen.getByText('Success'));

    expect(mockPatchCall).toHaveBeenCalledWith(
      expect.objectContaining({
        contractId: mockContract.contractId,
        metadata: expect.objectContaining({ note: 'ok', reviewed: true }),
      })
    );

    await new Promise(process.nextTick);
    expect(mockOnSuccess).toHaveBeenCalledWith({ success: true });
  });

  test('handleSuccess early return if contract is null', async () => {
    const mockOnSuccess = vi.fn();
    render(
      <ModalContractDetail
        onClose={() => {}}
        onSuccess={mockOnSuccess}
        material="Gold"
        contract={null}
      />
    );
    expect(screen.queryByText('Success')).not.toBeInTheDocument();
    expect(mockPatchCall).not.toHaveBeenCalled();
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  test('handleSuccess with contract executes full branch (coverage for contract?.contractId ?? 0)', async () => {
    const mockOnSuccess = vi.fn();

    render(
      <ModalContractDetail
        onClose={() => {}}
        onSuccess={mockOnSuccess}
        material="Gold"
        contract={mockContract}
      />
    );

    fireEvent.click(screen.getByText('Success'));

    expect(mockPatchCall).toHaveBeenCalledWith(
      expect.objectContaining({
        contractId: mockContract.contractId,
        metadata: expect.objectContaining({ note: 'ok', reviewed: true }),
      })
    );

    await new Promise(process.nextTick);
    expect(mockOnSuccess).toHaveBeenCalledWith({ success: true });
  });

  test('useEffect calls getContractJewels.call when status is IDLE', () => {
    render(
      <ModalContractDetail
        onClose={() => {}}
        onSuccess={() => {}}
        material="Gold"
        contract={mockContract}
      />
    );
    expect(mockCall).toHaveBeenCalledWith(mockContract.contractId);
  });

  test('useEffect does not call getContractJewels.call when status is not IDLE', () => {
    mockUseGetContractJewels.status = FetchStatus.LOADING;
    render(
      <ModalContractDetail
        onClose={() => {}}
        onSuccess={() => {}}
        material="Gold"
        contract={mockContract}
      />
    );
    expect(mockCall).not.toHaveBeenCalled();
  });
});
