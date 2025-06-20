import { useEffect } from 'react';
import {
  useGetAllMaterialTypes,
  useGetAllResolutions,
  useGetAllStatus,
} from '../../../clients';
import { FetchStatus, FIRST_PAGE, STATUS_RESOLUTION } from '../../../utils';
import { defaultResolutionsFormValues } from '../../index/utils';

const useServices = () => {
  const getAllResolutions = useGetAllResolutions();
  const getAllStatus = useGetAllStatus();
  const getAllMaterialType = useGetAllMaterialTypes();

  useEffect(() => {
    if (getAllResolutions.status === FetchStatus.IDLE) {
      getAllResolutions.call({
        ...defaultResolutionsFormValues,
        page: FIRST_PAGE,
      });
    }
    if (getAllStatus.status === FetchStatus.IDLE) {
      getAllStatus.call({ tableId: STATUS_RESOLUTION });
    }
    if (getAllMaterialType.status === FetchStatus.IDLE) {
      getAllMaterialType.call();
    }
  }, [getAllMaterialType, getAllResolutions, getAllStatus]);

  return { getAllMaterialType, getAllResolutions, getAllStatus };
};

export default useServices;
