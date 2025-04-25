import { vi, describe, it, expect, beforeEach } from 'vitest';
import { fetchSecureData } from './fetchSecureData';
import { API_BASE } from '../conf/http';

const mockToken = 'mock-token';

vi.mock('../hooks/useJWTNotification', () => ({
    getToken: () => mockToken,
}));

describe('fetchSecureData', () => {
    beforeEach(() => {
        globalThis.fetch = vi.fn();
    });

    it('should fetch secure data successfully', async () => {
        const mockResponse = { data: 'secure-data' };

        globalThis.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            })
        ) as unknown as typeof fetch;

        const result = await fetchSecureData();

        expect(globalThis.fetch).toHaveBeenCalledWith(`${API_BASE}/api/v1/secure/data`, {
            method: 'GET',
            headers: {
                Authorization: mockToken,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        expect(result).toEqual(mockResponse);
    });

    it('should throw an error if response is not ok', async () => {
        globalThis.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                status: 403,
            })
        ) as unknown as typeof fetch;

        await expect(fetchSecureData()).rejects.toThrow('HTTP error! status: 403');
    });
});