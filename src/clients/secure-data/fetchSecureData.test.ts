import { vi, describe, it, expect, beforeEach } from 'vitest';
import { fetchSecureData } from './fetchSecureData';
import { API_BASE } from '../../conf/http';

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

        const result = await fetchSecureData(mockToken); // 👈 Pasamos mockToken aquí

        expect(globalThis.fetch).toHaveBeenCalledWith(`${API_BASE}/api/v1/secure/data`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${mockToken}`, // 👈 Ahora incluye Bearer
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
                statusText: 'Forbidden',
            })
        ) as unknown as typeof fetch;

        await expect(fetchSecureData(mockToken)).rejects.toThrow('HTTP error! status: 403'); // 👈 Pasamos mockToken aquí
    });
});
