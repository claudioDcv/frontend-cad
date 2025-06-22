import { useEffect } from 'react';

import { FetchStatus } from '../../../utils';

import useGetResolution from '../../../clients/get-resolution';
import { useGetAllContracts } from '../../../clients';

import { defaultContractsFormValues } from '../../index/utils';

import { getMaterialFromLabel } from '../utils';


const useServices = (resolutionId: string) => {
  const getAllContracts = useGetAllContracts();
  const getResolution = useGetResolution();

  const materialValue = getMaterialFromLabel(getResolution.data?.categoryName);

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

  return { getAllContracts, getResolution, materialValue };
};

export default useServices;
