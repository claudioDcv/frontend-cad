// src/clients/customFetch.ts
import { API_BASE } from '@/conf/http';
import { getHeader } from './utils';
import { typeLog, LogType } from '@/utils';

export interface FetchOptions extends RequestInit {
    query?: Record<string, string | number | boolean>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    remap?: (data: any) => any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestBody?: (data: any) => any;
    withoutBodyResponse?: boolean;
}

export const customFetch = Object.assign(
    async <T>(
        endpoint: string,
        options: FetchOptions = {},
        errorMessages: { responseError: string; defaultError: string } = {
            responseError: 'error.responseError',
            defaultError: 'error.defaultError',
        }
    ): Promise<T> => {
        const { query, headers, ...restOptions } = options;

        // Leer BASE_URL dinámicamente
        const BASE_URL = API_BASE || 'https://api.example.com';

        // Construir la URL con query params
        const url = new URL(
            endpoint.startsWith('/') ? `${BASE_URL}${endpoint}` : `${BASE_URL}/${endpoint}`
        );
        if (query) {
            Object.entries(query).forEach(([key, value]) => {
                url.searchParams.append(key, String(value));
            });
        }

        // Configurar headers comunes usando getHeader
        const defaultHeaders: HeadersInit = getHeader();

        typeLog(LogType.FETCH, url, restOptions.method || 'GET');
        const response = await fetch(url.toString(), {
            ...restOptions,
            headers: { ...defaultHeaders, ...headers },
        });

        // Manejo de errores
        if (!response.ok) {
            const errorData = await response.json();
            throw {
                status: response.status,
                statusText: response.statusText,
                message: errorData?.message || errorMessages.responseError,
                details: errorData || errorMessages.defaultError,
            };
        }

        if (options.withoutBodyResponse) {
            return {} as T;
        }

        // Parsear la respuesta como JSON
        if (options.remap) {
            return options.remap(await response.json());
        }
        return (await response.json()) as T;
    },
    {
        get: async <T>(
            endpoint: string,
            options: FetchOptions = {},
            errorMessages: { responseError: string; defaultError: string } = {
                // TODO: Traducir
                responseError: 'error.responseError',
                defaultError: 'error.defaultError',
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
            const processedBody = options.requestBody ? options.requestBody(body) : body;
            return customFetch<T>(
                endpoint,
                { ...options, method: 'POST', body: JSON.stringify(processedBody) },
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
        patch: async <T>(
            endpoint: string,
            body?: unknown,
            options: FetchOptions = {},
            errorMessages: { responseError: string; defaultError: string } = {
                responseError: 'errors.responseError',
                defaultError: 'errors.defaultError',
            }
        ): Promise<T> => {
            return customFetch<T>(
                endpoint,
                {
                    ...options,
                    method: 'PATCH',
                    ...(body ? { body: JSON.stringify(body) } : {}),
                },
                errorMessages
            );
        },
    }
);

export const getFetch = customFetch.get;
export const postFetch = customFetch.post;
export const putFetch = customFetch.put;
export const deleteFetch = customFetch.delete;
export const patchFetch = customFetch.patch;