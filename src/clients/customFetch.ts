// src/clients/customFetch.ts
import { API_BASE } from '@/conf/http';
import { getHeader } from './utils';

export interface FetchOptions extends RequestInit {
    queryParams?: Record<string, string | number | boolean>;
}

export const customFetch = Object.assign(
    async <T>(
        endpoint: string,
        options: FetchOptions = {},
        errorMessages: { responseError: string; defaultError: string } = {
            responseError: 'errors.responseError',
            defaultError: 'errors.defaultError',
        }
    ): Promise<T> => {
        const { queryParams, headers, ...restOptions } = options;

        // Leer BASE_URL dinámicamente
        const BASE_URL = API_BASE || 'https://api.example.com';

        // Construir la URL con query params
        const url = new URL(
            endpoint.startsWith('/') ? `${BASE_URL}${endpoint}` : `${BASE_URL}/${endpoint}`
        );
        if (queryParams) {
            Object.entries(queryParams).forEach(([key, value]) => {
                url.searchParams.append(key, String(value));
            });
        }

        // Configurar headers comunes usando getHeader
        const defaultHeaders: HeadersInit = getHeader();

        const response = await fetch(url.toString(), {
            ...restOptions,
            headers: { ...defaultHeaders, ...headers },
        });

        // Manejo de errores
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw {
                status: response.status,
                statusText: response.statusText,
                message: errorData?.message || errorMessages.responseError,
                details: errorData || errorMessages.defaultError,
            };
        }

        // Parsear la respuesta como JSON
        return (await response.json()) as T;
    },
    {
        get: async <T>(
            endpoint: string,
            options: FetchOptions = {},
            errorMessages: { responseError: string; defaultError: string } = {
                responseError: 'errors.responseError',
                defaultError: 'errors.defaultError',
            }
        ): Promise<T> => {
            return customFetch<T>(endpoint, { ...options, method: 'GET' }, errorMessages);
        },

        post: async <T>(
            endpoint: string,
            body: unknown,
            options: FetchOptions = {},
            errorMessages: { responseError: string; defaultError: string } = {
                responseError: 'errors.responseError',
                defaultError: 'errors.defaultError',
            }
        ): Promise<T> => {
            return customFetch<T>(
                endpoint,
                { ...options, method: 'POST', body: JSON.stringify(body) },
                errorMessages
            );
        },

        put: async <T>(
            endpoint: string,
            body: unknown,
            options: FetchOptions = {},
            errorMessages: { responseError: string; defaultError: string } = {
                responseError: 'errors.responseError',
                defaultError: 'errors.defaultError',
            }
        ): Promise<T> => {
            return customFetch<T>(
                endpoint,
                { ...options, method: 'PUT', body: JSON.stringify(body) },
                errorMessages
            );
        },

        delete: async <T>(
            endpoint: string,
            options: FetchOptions = {},
            errorMessages: { responseError: string; defaultError: string } = {
                responseError: 'errors.responseError',
                defaultError: 'errors.defaultError',
            }
        ): Promise<T> => {
            return customFetch<T>(endpoint, { ...options, method: 'DELETE' }, errorMessages);
        },
    }
);

export const getFetch = customFetch.get;
export const postFetch = customFetch.post;
export const putFetch = customFetch.put;
export const deleteFetch = customFetch.delete;