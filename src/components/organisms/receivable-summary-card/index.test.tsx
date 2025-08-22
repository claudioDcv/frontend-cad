import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ReceivableSummaryCard from './index';
import type { Receivable } from '@/entities/Receivable.entity';
import { JSX } from 'react';

// Mocks
vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key })
}));
vi.mock('@/conf/theme', () => ({
    default: {
        palette: { background: { paper: '#fff' }, text: { secondary: '#888' } },
        typography: { h6: { fontSize: '1rem' } }
    }
}));
vi.mock('../../../utils', () => ({
    formatCurrency: (n: number) => `$${n}`,
    formatDateHour: (d: string) => (new Date(d)).toLocaleString(),
    formatNumberWithGr: (n: number) => `${n}gr`,
}));
vi.mock('../..', () => ({
    DisplayData: ({ label, value }: { label: string; value: string | number | JSX.Element | null }) => (
        <div data-testid="display-data"><span>{label}</span><span>{value}</span></div>
    )
}));

const baseReceivable: Receivable = {
    id: 1,
    contractId: 2,
    createdBy: 3,
    reviewedBy: 4,
    typeId: 5,
    weight: 100,
    quantity: 2,
    operatorNote: 'Nota operador',
    administratorNote: 'Nota admin',
    averagePrice: 1500,
    observation: 'obs',
    createdByName: 'Operador',
    reviewedByName: 'Admin',
    typeName: 'Tipo',
    status: false,
    createdAt: '2023-01-01T10:00:00.000Z',
    updatedAt: '2023-01-01T10:00:00.000Z'
};

describe('ReceivableSummaryCard', () => {
    it('renderiza los datos principales', () => {
        render(<ReceivableSummaryCard receivable={baseReceivable} />);
        expect(screen.getByText('accountsReceivable.summaryTitle')).toBeInTheDocument();
        expect(screen.getAllByTestId('display-data').length).toBeGreaterThan(0);
        expect(screen.getByText('100gr')).toBeInTheDocument();
        expect(screen.getByText('2gr')).toBeInTheDocument();
        expect(screen.getByText('$1500')).toBeInTheDocument();
        expect(screen.getByText('Operador')).toBeInTheDocument();
        expect(screen.getByText('Admin')).toBeInTheDocument();
        expect(screen.getByText('Nota operador')).toBeInTheDocument();
        expect(screen.getByText('Nota admin')).toBeInTheDocument();
    });

    it('muestra el averagePrice del contrato si es igual', () => {
        render(<ReceivableSummaryCard receivable={baseReceivable} contractAveragePurchaseValue={1500} />);
        expect(screen.getByText('$1500')).toBeInTheDocument();
    });

    it('muestra el averagePrice modificado y el del contrato entre paréntesis', () => {
        render(<ReceivableSummaryCard receivable={{ ...baseReceivable, averagePrice: 2000 }} contractAveragePurchaseValue={1500} />);
        expect(screen.getByText('$2000')).toBeInTheDocument();
        expect(screen.getByText('($1500)')).toBeInTheDocument();
    });

    it('muestra null si no hay averagePrice', () => {
        render(<ReceivableSummaryCard receivable={{ ...baseReceivable, averagePrice: 12 }} />);
        // No debe renderizar el valor
        expect(screen.queryByText('$')).not.toBeInTheDocument();
    });
});
