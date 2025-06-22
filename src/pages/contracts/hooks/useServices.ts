import { useEffect } from 'react';

import useGetResolution from '../../../clients/get-resolution';
import { getMaterialFromLabel } from '../utils';
import { useGetAllContracts } from '../../../clients';
import { FetchStatus } from '../../../utils';
import { defaultContractsFormValues } from '../../index/utils';

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
      });
    }
  }, [getAllContracts, getResolution, resolutionId]);

  return { getAllContracts, getResolution, materialValue };
};

export default useServices;
