import { useCallback, useState } from 'react';
import { FetchStatus } from '../../utils';
import client from './client';
import { remap } from './utils';
import { ResolutionPaginated } from './types';
import { useTranslation } from 'react-i18next';
import { ResolutionFormModel } from '../../pages/index/types';

const useGetAllResolutions = () => {
  const { t } = useTranslation();

  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<ResolutionPaginated>({
    resolutions: [],
    meta: { page: 0, count: 0 },
  });
  const [error, setError] = useState<string | null>(null);

  const onResetError = () => {
    setData({ resolutions: [], meta: { page: 0, count: 0 } });
    setError(null);
  };

  const call = useCallback(
    async (props: ResolutionFormModel) => {
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
          stateId: props?.status?.value || undefined,
          categoryId: props?.categoryId?.value || undefined,
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

export default useGetAllResolutions;
