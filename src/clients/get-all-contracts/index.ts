import { useCallback, useState } from 'react';
import { FetchStatus, parseOptionalNumber } from '../../utils';
import client from './client';
import { Contract } from './types';
import { useTranslation } from 'react-i18next';
import { ContractFormModel } from '../../pages/index/types';

const useGetAllContracts = () => {
  const { t } = useTranslation();

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
        setError(null);
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
        setError(t(messageKey));
        setStatus(FetchStatus.ERROR);
      }
    },
    [status, t]
  );

  return { status, contracts, error, call, onResetError };
};

export default useGetAllContracts;
