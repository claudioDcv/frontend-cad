import { useEffect } from 'react';
import { FetchStatus, STATUS_CONTRACTS } from '@/constants';
import {
  useGetAllStatus,
  useGetResolution,
  useGetResolutionContracts,
  usePatchResolutionResolve,
} from '@/clients';

const useServices = (resolutionId?: string) => {
  const getAllStatus = useGetAllStatus();
  const getResolution = useGetResolution();
  const getResolutionContracts = useGetResolutionContracts();
  const patchResolutionResolve = usePatchResolutionResolve();

  useEffect(() => {
    if (getAllStatus.status === FetchStatus.IDLE) {
      getAllStatus.call({ tableId: STATUS_CONTRACTS });
    }
  }, [getAllStatus]);

  useEffect(() => {
    if (
      resolutionId &&
      getResolution.status === FetchStatus.IDLE &&
      getResolutionContracts.status === FetchStatus.IDLE
    ) {
      getResolution.call(resolutionId);
      getResolutionContracts.call(resolutionId);
    }
  }, [resolutionId, getResolution, getResolutionContracts]);

  return {
    getAllStatus,
    getResolution,
    getResolutionContracts,
    patchResolutionResolve,
  };
};

export default useServices;
