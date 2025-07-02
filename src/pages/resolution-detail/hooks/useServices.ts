import { useEffect } from 'react';
import { FetchStatus } from '@/constants';
import { useGetAllContracts } from '@/clients';
import useGetResolution from '@/clients/get-resolution';
import { defaultContractsFormValues } from '../../index/utils';

const useServices = (resolutionId: string) => {
  const getAllContracts = useGetAllContracts();
  const getResolution = useGetResolution();

  useEffect(() => {
    if (!resolutionId) return;

    if (getResolution.status === FetchStatus.IDLE) {
      getResolution.call(resolutionId);
    }
    if (getAllContracts.status === FetchStatus.IDLE) {
      getAllContracts.call({
        ...defaultContractsFormValues,
        resolutionId,
      });
    }
  }, [getAllContracts, getResolution, resolutionId]);

  return { getAllContracts, getResolution };
};

export default useServices;
