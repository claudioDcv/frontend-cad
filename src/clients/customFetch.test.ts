import { customFetch } from './customFetch';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// mock import { API_BASE } from '@/conf/http';
vi.mock('@/conf/http', () => ({
    API_BASE: 'https://api.example.com',
}));

describe('customFetch', () => {
    beforeEach(() => {
        mockFetch.mockReset();
    });

    test('should make a GET request and return data', async () => {
        const mockData = { success: true };
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const result = await customFetch.get('/test-endpoint');

        expect(mockFetch).toHaveBeenCalledWith(
            'https://api.example.com/test-endpoint',
            expect.objectContaining({ method: 'GET' })
        );
        expect(result).toEqual(mockData);
    });

    test('should make a POST request with body and return data', async () => {
        const mockData = { success: true };
        const body = { key: 'value' };
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const result = await customFetch.post('/test-endpoint', body);

        expect(mockFetch).toHaveBeenCalledWith(
            'https://api.example.com/test-endpoint',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify(body),
            })
        );
        expect(result).toEqual(mockData);
    });

    test('should throw an error for a failed request', async () => {
        const mockError = { message: 'Request failed' };
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
            statusText: 'Bad Request',
            json: async () => mockError,
        });

        await expect(customFetch.get('/test-endpoint')).rejects.toEqual({
            status: 400,
            statusText: 'Bad Request',
            message: 'Request failed',
            details: mockError,
        });

        expect(mockFetch).toHaveBeenCalledWith(
            'https://api.example.com/test-endpoint',
            expect.objectContaining({ method: 'GET' })
        );
    });

    test('should handle query parameters', async () => {
        const mockData = { success: true };
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const result = await customFetch.get('/test-endpoint', {
            query: { key: 'value', anotherKey: 123 },
        });

        expect(mockFetch).toHaveBeenCalledWith(
            'https://api.example.com/test-endpoint?key=value&anotherKey=123',
            expect.objectContaining({ method: 'GET' })
        );
        expect(result).toEqual(mockData);
    });
});
