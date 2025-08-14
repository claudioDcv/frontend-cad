import { useEffect } from 'react';
import { FetchStatus } from '@/constants';
import { useGetResolution, useGetResolutionInventory } from '@/clients';

const useServices = (resolutionId: number) => {
  const getResolutionInventory = useGetResolutionInventory();
  const getResolution = useGetResolution();

  useEffect(() => {
    if (resolutionId && getResolutionInventory.status === FetchStatus.IDLE) {
      getResolutionInventory.call(resolutionId);
    }

    if (resolutionId && getResolution.status === FetchStatus.IDLE) {
      getResolution.call(resolutionId);
    }
  }, [getResolution, getResolutionInventory, resolutionId]);

  return {
    getResolutionInventory,
    getResolution,
  };
};

export default useServices;
