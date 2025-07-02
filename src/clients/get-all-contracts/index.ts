import { useCallback, useState } from 'react';
import client from './client';
import { Contract } from '@/entities/Contract.entity';
import { ContractFormModel } from '../../pages/index/types';
import { FetchStatus, parseOptionalNumber } from '../../utils';

const useGetAllContracts = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onResetError = () => {
    setContracts([]);
    setError(null);
  };

  const call = useCallback(
    async (props: ContractFormModel) => {
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
        const result = await client({
          resolutionId: parseOptionalNumber(props.resolutionId),
          contractNumber: props.contractNumber
        });

        setContracts(result);
        setStatus(FetchStatus.SUCCESS);
      } catch (err) {
        const messageKey = (err as Error)?.message ?? 'error.genericHttpError';
        setError(messageKey);
        setStatus(FetchStatus.ERROR);
      }
    },
    [status]
  );

  return { status, contracts, error, call, onResetError };
};

export default useGetAllContracts;
