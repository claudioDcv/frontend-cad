import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import ReceivableSummaryCard from './index';
import type { Receivable } from '@/entities/Receivable.entity';
import { JSX } from 'react';

// Mocks
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('@/conf/theme', () => ({
  default: {
    palette: { background: { paper: '#fff' }, text: { secondary: '#888' } },
    typography: { h6: { fontSize: '1rem' } },
  },
}));

vi.mock('../../../utils', () => ({
  formatDateHour: (d: string) => new Date(d).toLocaleString(),
  formatNumberWithGr: (n: number) => `${n}gr`,
  renderAveragePrice: (value: number, contractValue?: number) => {
    if (value === 0) return null; // simula "sin valor"
    if (contractValue != null && value !== contractValue) {
      return (
        <div>
          <strong>${value}</strong> <small>(${contractValue})</small>
        </div>
      );
    }
    return <>${value}</>;
  },
}));

vi.mock('../..', () => ({
  DisplayData: ({
    label,
    value,
  }: {
    label: string;
    value: string | number | JSX.Element | null;
  }) => (
    <div data-testid="display-data">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  ),
}));

const baseReceivable: Receivable = {
  id: 1,
  contractId: 2,
  createdBy: 3,
  reviewedBy: 4,
  typeId: 5,
  weight: 100,
  quantity: 2,
  operatorNote: 'Operator note',
  administratorNote: 'Admin note',
  averagePrice: 1500,
  observation: 'obs',
  createdByName: 'Operator',
  reviewedByName: 'Admin',
  typeName: 'Type',
  status: false,
  createdAt: '2023-01-01T10:00:00.000Z',
  updatedAt: '2023-01-01T10:00:00.000Z',
};

describe('ReceivableSummaryCard', () => {
  test('renders main data correctly', () => {
    render(<ReceivableSummaryCard receivable={baseReceivable} />);
    expect(
      screen.getByText('accountsReceivable.summaryTitle')
    ).toBeInTheDocument();
    expect(screen.getAllByTestId('display-data').length).toBeGreaterThan(0);
    expect(screen.getByText('100gr')).toBeInTheDocument();
    expect(screen.getByText('2gr')).toBeInTheDocument();
    expect(screen.getByText('$1500')).toBeInTheDocument();
    expect(screen.getByText('Operator')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Operator note')).toBeInTheDocument();
    expect(screen.getByText('Admin note')).toBeInTheDocument();
  });

  test('renders averagePrice when equal to contract value', () => {
    render(
      <ReceivableSummaryCard
        receivable={baseReceivable}
        contractAveragePurchaseValue={1500}
      />
    );
    expect(screen.getByText('$1500')).toBeInTheDocument();
  });

  test('renders modified averagePrice with contract value in parentheses', () => {
    render(
      <ReceivableSummaryCard
        receivable={{ ...baseReceivable, averagePrice: 2000 }}
        contractAveragePurchaseValue={1500}
      />
    );
    expect(screen.getByText('$2000')).toBeInTheDocument();
    expect(screen.getByText('($1500)')).toBeInTheDocument();
  });

  test('does not render averagePrice if it is 0', () => {
    render(
      <ReceivableSummaryCard
        receivable={{ ...baseReceivable, averagePrice: 0 }}
      />
    );
    expect(screen.queryByText('$')).not.toBeInTheDocument();
  });
});
