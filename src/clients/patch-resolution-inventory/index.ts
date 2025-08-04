import { useCallback, useState } from 'react';
import { FetchStatus } from '@/constants';
import { InventoryResolution } from '@/entities/InventoryResolution.entity';
import client from './client';

const usePatchResolutionInventory = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<InventoryResolution[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onResetError = () => {
    setData([]);
    setError(null);
  };

  const call = useCallback(
    async (resolutionId: string) => {
      if (status === FetchStatus.ERROR) {
        return;
      }

      if (status === FetchStatus.LOADING) {
        setStatus(FetchStatus.SUCCESS);
        setError('');
        return;
      }

      setStatus(FetchStatus.LOADING);

      try {
        const result = await client(resolutionId);

        setData(result);
        setStatus(FetchStatus.SUCCESS);
      } catch (err) {
        const messageKey =
          (err as Error)?.message ?? 'error.getAllContractsFetch';
        setError(messageKey);
        setStatus(FetchStatus.ERROR);
      }
    },
    [status]
  );

  return {
    status,
    data,
    error,
    call,
    onResetError,
  };
};

export default usePatchResolutionInventory;
