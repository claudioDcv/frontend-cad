import { useCallback, useState } from 'react';
import { FetchStatus } from '../../utils';
import client from './client';
import { remap } from './utils';
import { Option } from '../../types';
import { useTranslation } from 'react-i18next';

const useGetAllMaterialTypes = () => {
  const { t } = useTranslation();
  
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<Option[]>([]);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(async () => {
    if (status === FetchStatus.ERROR) {
      return;
    }
    if (
      status === FetchStatus.LOADING ||
      status === FetchStatus.SUCCESS ||
      data.length
    ) {
      setStatus(FetchStatus.SUCCESS);
      setError(null);
      return;
    }

    setStatus(FetchStatus.LOADING);
    
    try {
      const result = await client();
      const model = remap(result);
      setData(model);
      setStatus(FetchStatus.SUCCESS);
    } catch (err) {
      setError(
        (err as Error).message || t('error.genericHttpError')
      );
      setStatus(FetchStatus.ERROR);
    }
  }, [status, data.length, t]);

  return { status, data, error, call };
};

export default useGetAllMaterialTypes;
