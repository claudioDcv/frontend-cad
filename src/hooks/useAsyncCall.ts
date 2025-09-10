import { useCallback, useState, useEffect } from 'react';
import { FetchStatus } from '@/constants';
import { useAlertContext } from '@/contexts/alert/useAlertContext';
import { AlertType } from '@/contexts/alert/types';
import { useTranslation } from 'react-i18next';

interface UseAsyncCallOptions<TRequest, TResponse> {
    client: (request: TRequest) => Promise<TResponse>;
    initial: TResponse;
}

const useAsyncCall = <TRequest, TResponse>({
    client,
    initial,
}: UseAsyncCallOptions<TRequest, TResponse>) => {
    const { t } = useTranslation();
    const alertContext = useAlertContext();
    const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
    const [data, setData] = useState<TResponse>(initial);
    const [error, setError] = useState<string | null>(null);
    const [processed, setProcessed] = useState(false);
    const [onSuccess, setOnSuccess] = useState<((data: TResponse) => void) | null>(null);
    const [onError, setOnError] = useState<((error: string) => void) | null>(null);

    // Auto-handle success/error without requiring external useEffect
    useEffect(() => {
        if (status === FetchStatus.SUCCESS && !processed && onSuccess && data) {
            setProcessed(true);
            onSuccess(data);
        }
    }, [status, processed, onSuccess, data]);

    useEffect(() => {
        if (status === FetchStatus.ERROR && !processed && onError && error) {
            setProcessed(true);
            onError(error);
        }
    }, [status, processed, onError, error]);

    const call = useCallback(
        async (
            request: TRequest,
            callbacks?: {
                onSuccess?: (data: TResponse) => void;
                onError?: (error: string) => void;
            }
        ) => {
            if (status === FetchStatus.ERROR) {
                return;
            }

            if (status === FetchStatus.LOADING) {
                setStatus(FetchStatus.SUCCESS);
                setError('');
                return;
            }

            // Set callbacks for this specific call
            setOnSuccess(() => callbacks?.onSuccess || null);
            setOnError(() => callbacks?.onError || null);

            setStatus(FetchStatus.LOADING);
            setProcessed(false); // Reset processed flag for new call

            try {
                const result = await client(request);

                setData(result);
                setStatus(FetchStatus.SUCCESS);
            } catch (err) {
                const messageKey =
                // TODO: Si el error persiste, contacte al area TI
                    (err as Error)?.message ?? 'error.genericHttpErrorMessage';
                setError(messageKey);
                setStatus(FetchStatus.ERROR);
                alertContext.addAlert({
                    type: AlertType.ERROR,
                    // TODO: tiene que decir error con el servidor
                    title: t('error.genericHttpError'),
                    message: t(messageKey),
                });
            }
        },
        [status, client, alertContext, t]
    );

    const reset = () => {
        setStatus(FetchStatus.IDLE);
        setData(initial);
        setError(null);
        setProcessed(false);
        setOnSuccess(null);
        setOnError(null);
    };

    return {
        status,
        data,
        error,
        call,
        reset,
        loading: status === FetchStatus.LOADING,
    };
};

export default useAsyncCall;
