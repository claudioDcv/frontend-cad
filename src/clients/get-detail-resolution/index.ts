import { useCallback, useState } from 'react';
import { ResolutionDetail } from '@/entities/ResolutiontDetail.entity';
import client from './client';
import { FetchStatus } from '../../utils';
import { Props } from './type';

const useGetAllResolutionDetails = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<ResolutionDetail[]>([]);
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
        setError(messageKey);
        setStatus(FetchStatus.ERROR);
      }
    },
    [status]
  );

  return { status, data, error, call };
};

export default useGetAllResolutionDetails;
