import { vi, describe, it, expect, beforeEach } from 'vitest';
import { fetchHealthCheck } from './fetchHealthCheck';
import { API_BASE } from '../../conf/http';

const mockToken = 'mock-token';

vi.mock('../hooks/useJWTNotification', () => ({
    getToken: () => mockToken,
}));

describe('fetchHealthCheck', () => {
    beforeEach(() => {
        globalThis.fetch = vi.fn();
    });

    it('should fetch health check successfully', async () => {
        const mockResponse = 'OK';

        globalThis.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                text: () => Promise.resolve(mockResponse),
            })
        ) as unknown as typeof fetch;

        const result = await fetchHealthCheck();

        expect(globalThis.fetch).toHaveBeenCalledWith(`${API_BASE}/api/v1/health`, {
            method: 'GET',
            headers: {
                Authorization: mockToken,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        expect(result).toBe(mockResponse);
    });

    it('should throw an error if response is not ok', async () => {
        globalThis.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                status: 500,
            })
        ) as unknown as typeof fetch;

        await expect(fetchHealthCheck()).rejects.toThrow('HTTP error! status: 500');
    });
});