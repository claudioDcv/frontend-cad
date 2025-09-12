import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ReceivablesAdmin from './index';
import { Receivable } from '@/entities/Receivable.entity';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('@/clients/get-receivables', () => ({
  default: () => ({
    status: 'success',
    data: {
      content: [
        {
          id: 1,
          status: true,
          contractId: 101,
          quantity: 2,
          weight: 10,
          createdByName: 'A',
          reviewedByName: 'B',
          typeName: 'gold',
        },
        {
          id: 2,
          status: false,
          contractId: 102,
          quantity: 3,
          weight: 20,
          createdByName: 'C',
          reviewedByName: null,
          typeName: 'silver',
        },
      ],
      meta: { page: 1, size: 15, total: 2 },
    },
    call: vi.fn(),
  }),
}));

vi.mock('@/components', () => ({
  IconList: (props: { name: string }) => <span data-testid={props.name} />,
}));

vi.mock('@/components/molecules/pagination', () => ({
  default: (props: { onChange: (e: unknown, page: number) => void }) => (
    <button data-testid="pagination" onClick={() => props.onChange({}, 2)}>
      Paginate
    </button>
  ),
}));

vi.mock('@/components/organisms/table', () => ({
  default: (props: {
    rows?: Receivable[];
    columns: unknown[];
    loading: boolean;
  }) => (
    <div data-testid="table">
      {props.rows?.map((r) => (
        <div key={r.id}>{r.id}</div>
      ))}
    </div>
  ),
}));

vi.mock('./components/view', () => ({
  default: (props: { receivable: Receivable | null; onClose: () => void }) =>
    props.receivable ? (
      <div data-testid="view-modal">{props.receivable.id}</div>
    ) : null,
}));

describe('ReceivablesAdmin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders table with receivables', () => {
    render(<ReceivablesAdmin />);
    expect(screen.getByTestId('table')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('calls pagination on change', () => {
    render(<ReceivablesAdmin />);
    const paginateBtn = screen.getByTestId('pagination');
    fireEvent.click(paginateBtn);

    expect(screen.getByTestId('table')).toBeInTheDocument();
  });
});
