import { useEffect } from 'react';
import { FetchStatus } from '@/constants';
import { useGetResolutionInventory } from '@/clients';

const useServices = (resolutionId: string) => {
  const getResolutionInventory = useGetResolutionInventory();

  useEffect(() => {
    if (resolutionId && getResolutionInventory.status === FetchStatus.IDLE) {
      getResolutionInventory.call(resolutionId);
    }
  }, [getResolutionInventory, resolutionId]);

  return {
    getResolutionInventory,
  };
};

export default useServices;
