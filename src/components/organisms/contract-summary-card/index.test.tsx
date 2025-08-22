import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContractSummaryCard from './index';
import type { Contract } from '@/entities/Contract.entity';
import { JSX } from 'react';

// Mocks
vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key })
}));
vi.mock('@/conf/theme', () => ({
    default: {
        palette: { background: { paper: '#fff' } },
        typography: { h6: { fontSize: '1rem' } }
    }
}));
vi.mock('../../../utils', () => ({
    formatCurrency: (n: number) => `$${n}`,
    formatNumberWithGr: (n: number) => `${n}gr`,
}));
vi.mock('../..', () => ({
    DisplayData: ({ label, value }: { label: string; value: string | number | JSX.Element | null }) => (
        <div data-testid="display-data"><span>{label}</span><span>{value}</span></div>
    )
}));

const baseContract: Contract = {
    contractNumber: 222222,
    totalWeight: 1000,
    totalContractValue: 50000,
    averagePurchaseValue: 1500,
    responsibleName: 'Juan Perez',
    endDate: '2025-12-31',
    clientName: 'Cliente S.A.',
    clientRut: '12.345.678-9',
    contractId: 0,
    statusId: 0,
    securityBagCode: '',
    jewelQuantity: 0,
    startDate: '',
    metadata: null
};

describe('ContractSummaryCard', () => {
    it('renderiza los datos principales', () => {
        render(<ContractSummaryCard contract={baseContract} />);
        expect(screen.getByText('contract.summaryTitle')).toBeInTheDocument();
        expect(screen.getAllByTestId('display-data').length).toBeGreaterThan(0);
        expect(screen.getByText('1000gr')).toBeInTheDocument();
        expect(screen.getByText('$50000')).toBeInTheDocument();
        expect(screen.getByText('$1500')).toBeInTheDocument();
        expect(screen.getByText('Juan Perez')).toBeInTheDocument();
        expect(screen.getByText('2025-12-31')).toBeInTheDocument();
        expect(screen.getByText('Cliente S.A.')).toBeInTheDocument();
        expect(screen.getByText('12.345.678-9')).toBeInTheDocument();
    });

    it('oculta la columna de cliente si hiddenClient es true', () => {
        render(<ContractSummaryCard contract={baseContract} hiddenClient />);
        expect(screen.queryByText('Cliente S.A.')).not.toBeInTheDocument();
        expect(screen.queryByText('12.345.678-9')).not.toBeInTheDocument();
    });
});
