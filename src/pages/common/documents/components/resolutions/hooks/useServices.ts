import { useEffect } from 'react';
import { FetchStatus, LOCATION_ACTIVE, STATUS_RESOLUTION, validRoles } from '@/constants';
import { defaultResolutionsFormValues } from '../../../utils';
import {
  useGetAllInvestments,
  useGetAllLocations,
  useGetAllMaterialTypes,
  useGetAllResolutions,
  useGetAllStatus,
} from '@/clients';
import useAccess from '@/components/atoms/access/useAccess';

const useServices = () => {
  const getAllResolutions = useGetAllResolutions();
  const getAllStatus = useGetAllStatus();
  const getAllMaterialType = useGetAllMaterialTypes();
  const getAllLocations = useGetAllLocations();
  const getAllInvestments = useGetAllInvestments();

  const access = useAccess();
  const isOperator = access([validRoles.operator]);

  useEffect(() => {
    if (getAllResolutions.status === FetchStatus.IDLE) {
      getAllResolutions.call({
        ...defaultResolutionsFormValues(),
        hasMetadata: isOperator || undefined,
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
    if (getAllLocations.status === FetchStatus.IDLE) {
      getAllLocations.call({
        status: LOCATION_ACTIVE,
      });
    }
  }, [getAllInvestments, getAllLocations, getAllMaterialType, getAllResolutions, getAllStatus, isOperator]);

  return {
    getAllMaterialType,
    getAllResolutions,
    getAllStatus,
    getAllInvestments,
    getAllLocations,
  };
};

export default useServices;
