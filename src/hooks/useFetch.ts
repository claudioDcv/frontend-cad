import { useCallback, useState } from 'react';
import { FetchStatus } from '@/constants';

interface UseFetchOptions<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client: (opts?: any) => Promise<unknown>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    remap?: (data: any) => any;
    initialData?: T | null;
    isReinvocable?: boolean;
}

const useFetch = <T,>(options: UseFetchOptions<T>) => {
    const { client, remap, initialData, isReinvocable } = options;
    const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
    const [data, setData] = useState<T | null>(initialData || null);
    const [error, setError] = useState<string | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const call = useCallback(async (opts?: any) => {
        if (status === FetchStatus.ERROR) {
            return;
        }
        if (
            (status === FetchStatus.LOADING ||
                status === FetchStatus.SUCCESS) &&
            !isReinvocable
        ) {
            setStatus(FetchStatus.SUCCESS);
            setError(null);
            return;
        }
        setStatus(FetchStatus.LOADING);

        try {
            const result = await client(opts);
            const model = remap ? remap(result) : result;
            setData(model as T);
            setStatus(FetchStatus.SUCCESS);
            return model as T;
        } catch (err) {
            const messageKey = (err as Error)?.message ?? 'error.genericHttpError';
            setError(messageKey);
            setStatus(FetchStatus.ERROR);
        }
    }, [status, client, remap, isReinvocable]);

    const clearData = (initialData: T | null = null) => {
        setData(initialData);
        setStatus(FetchStatus.IDLE);
        setError(null);
    };

    return { status, data, error, call, clearData };
};

export default useFetch;
