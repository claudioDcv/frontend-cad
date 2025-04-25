import { describe, expect, it, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Index from './index';
import { fetchSecureData } from '../../clients/fetchSecureData';
import { fetchHealthCheck } from '../../clients/fetchHealthCheck';

vi.mock('../../clients/fetchSecureData', () => ({
    fetchSecureData: vi.fn(),
}));

vi.mock('../../clients/fetchHealthCheck', () => ({
    fetchHealthCheck: vi.fn(),
}));

vi.mock('../../hooks/useJWTNotification', () => ({
    getToken: vi.fn(() => 'mock-jwt-token'),
}));

describe('Index Component', () => {
    it('renders the component correctly', () => {
        render(<Index />);
        expect(screen.getByText('Index')).toBeInTheDocument();
        expect(screen.getByText(/jwt: mock-jwt-token/)).toBeInTheDocument();
    });

    it('handles health check request successfully', async () => {
        (fetchHealthCheck as Mock).mockResolvedValue('Health OK');

        render(<Index />);

        const healthCheckButton = screen.getByText('request: /api/v1/health');
        fireEvent.click(healthCheckButton);

        expect(await screen.findByText('response: /api/v1/health')).toBeInTheDocument();
        expect(screen.getByText('Health OK')).toBeInTheDocument();
    });

    it('handles secure data request successfully', async () => {
        const mockSecureData = { data: 'secure-data' };
        (fetchSecureData as Mock).mockResolvedValue(mockSecureData);

        render(<Index />);

        const secureDataButton = screen.getByText('request: (/api/v1/secure/data)');
        fireEvent.click(secureDataButton);

        expect(await screen.findByText('response: /api/v1/secure/data')).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return element?.tagName === 'PRE' && content.includes('"data": "secure-data"');
        })).toBeInTheDocument();
    });

    it('displays error message on failed requests', async () => {
        (fetchHealthCheck as Mock).mockRejectedValue(new Error('Health check failed'));

        render(<Index />);

        const healthCheckButton = screen.getByText('request: /api/v1/health');
        fireEvent.click(healthCheckButton);

        expect(await screen.findByText('error: Health check failed')).toBeInTheDocument();
    });
});
