import { useCallback, useState } from 'react';
import { FetchStatus } from '../../utils';
import client from './client';
import { useTranslation } from 'react-i18next';
import { ContractDetail, Props } from './type';

const useGetAllContractDetails = () => {
  const { t } = useTranslation();

  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<ContractDetail[]>([]);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(
    async (props: Props) => {
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
        const result = await client(props);
        setData(result);
        setStatus(FetchStatus.SUCCESS);
      } catch (err) {
        const messageKey = (err as Error)?.message ?? 'error.genericHttpError';
        setError(t(messageKey));
        setStatus(FetchStatus.ERROR);
      }
    },
    [status, t]
  );

  return { status, data, error, call };
};

export default useGetAllContractDetails;
