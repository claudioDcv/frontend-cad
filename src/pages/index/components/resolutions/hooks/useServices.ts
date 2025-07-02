import { useEffect } from 'react';
import {
  useGetAllInvestments,
  useGetAllLocations,
  useGetAllMaterialTypes,
  useGetAllResolutions,
  useGetAllStatus,
} from '@clients/index';
import { FetchStatus, STATUS_RESOLUTION } from '@/constants';
import { defaultResolutionsFormValues } from '../../../utils';

const useServices = () => {
  const getAllResolutions = useGetAllResolutions();
  const getAllStatus = useGetAllStatus();
  const getAllMaterialType = useGetAllMaterialTypes();
  const getAllLocations = useGetAllLocations();
  const getAllInvestments = useGetAllInvestments();

  useEffect(() => {
    if (getAllResolutions.status === FetchStatus.IDLE) {
      getAllResolutions.call({
        ...defaultResolutionsFormValues,
      });
    }
    if (getAllStatus.status === FetchStatus.IDLE) {
      getAllStatus.call({ tableId: STATUS_RESOLUTION });
    }
    if (getAllMaterialType.status === FetchStatus.IDLE) {
      getAllMaterialType.call();
    }
    if (getAllInvestments.status === FetchStatus.IDLE) {
      getAllInvestments.call();
    }
  }, [getAllInvestments, getAllMaterialType, getAllResolutions, getAllStatus]);

  return {
    getAllMaterialType,
    getAllResolutions,
    getAllStatus,
    getAllInvestments,
    getAllLocations,
  };
};

export default useServices;
