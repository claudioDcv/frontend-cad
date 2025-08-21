import { useCallback, useState, useEffect } from 'react';
import { FetchStatus } from '@/constants';

interface UseAsyncCallOptions<TRequest, TResponse> {
  client: (request: TRequest) => Promise<TResponse>;
  initialData?: TResponse;
}

const useAsyncCall = <TRequest, TResponse>({
  client,
  initialData,
}: UseAsyncCallOptions<TRequest, TResponse>) => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<TResponse | undefined>(initialData);
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
          (err as Error)?.message ?? 'error.genericHttpError';
        setError(messageKey);
        setStatus(FetchStatus.ERROR);
      }
    },
    [status, client]
  );

  return {
    status,
    data,
    error,
    call,
    loading: status === FetchStatus.LOADING,
  };
};

export default useAsyncCall;
