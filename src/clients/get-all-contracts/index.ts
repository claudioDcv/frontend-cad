import { useCallback, useState } from 'react';
import { FetchStatus } from '../../utils';
import { ContractFormModel } from '../../pages/index/types';

import client from './client';
import { initialContractData, remap } from './utils';
import { ContractPaginated } from './types';

const useGetAllContracts = () => {

  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<ContractPaginated>(initialContractData);
  const [error, setError] = useState('');

  const onResetError = () => {
    setData(initialContractData);
    setError('');
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
          page: props.page,
          resolutionId: props.resolutionId,
          contractNumber: props.contractNumber
        });

        const model = remap(result);
        setData(model);
        setStatus(FetchStatus.SUCCESS);
      } catch (err) {
        const messageKey = (err as Error)?.message ?? 'error.genericHttpError';
        setError(messageKey);
        setStatus(FetchStatus.ERROR);
      }
    },
    [status]
  );

  return { status, data, error, call, onResetError };
};

export default useGetAllContracts;
