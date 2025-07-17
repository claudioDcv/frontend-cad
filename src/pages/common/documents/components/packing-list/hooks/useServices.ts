import { useEffect } from 'react';
import { FetchStatus, STATUS_PACKING_LIST } from '@/constants';
import {
  useGetAllInvestments,
  useGetAllLocations,
  useGetAllMaterialTypes,
  useGetAllPackingList,
  useGetAllStatus,
} from '@clients/index';
import { defaultPackingListFormValues } from '@/pages/common/documents/utils';

const useServices = () => {
  const getAllPackingList = useGetAllPackingList();
  const getAllStatus = useGetAllStatus();
  const getAllLocations = useGetAllLocations();
  const getAllMaterialType = useGetAllMaterialTypes();
  const getAllInvestments = useGetAllInvestments();

  useEffect(() => {
    if (getAllPackingList.status === FetchStatus.IDLE) {
      getAllPackingList.call({
        ...defaultPackingListFormValues(),
      });
    }
    if (getAllStatus.status === FetchStatus.IDLE) {
      getAllStatus.call({ tableId: STATUS_PACKING_LIST });
    }
    if (getAllMaterialType.status === FetchStatus.IDLE) {
      getAllMaterialType.call();
    }
    if (getAllInvestments.status === FetchStatus.IDLE) {
      getAllInvestments.call();
    }
  }, [getAllInvestments, getAllMaterialType, getAllPackingList, getAllStatus]);

  return {
    getAllMaterialType,
    getAllPackingList,
    getAllStatus,
    getAllInvestments,
    getAllLocations,
  };
};

export default useServices;
