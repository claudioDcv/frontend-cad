import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FetchStatus } from '../../utils';
import { ContractFormModel } from '../../pages/index/types';

import client from './client';
import { initialContractData, remap } from './utils';
import { ContractPaginated } from './types';

const useGetAllContracts = () => {
  const { t } = useTranslation();

  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<ContractPaginated>(initialContractData);
  const [error, setError] = useState<string | null>(null);

  const onResetError = () => {
    setData(initialContractData);
    setError(null);
  };

  const call = useCallback(
    async (props: ContractFormModel) => {
      if (status === FetchStatus.ERROR) {
        return;
      }

      if (status === FetchStatus.LOADING) {
        setStatus(FetchStatus.SUCCESS);
        setError(null);
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
        setError(t(messageKey));
        setStatus(FetchStatus.ERROR);
      }
    },
    [status, t]
  );

  return { status, data, error, call, onResetError };
};

export default useGetAllContracts;
