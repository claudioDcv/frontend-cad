import { useGetAllStatus } from '@/clients';
import useGetPackingListContracts from '@/clients/get-packing-list';
import { FetchStatus, STATUS_PACKING_LIST } from '@/constants';
import { useEffect } from 'react';

const useServices = (packinglistId?: number | string) => {
  const getPackingListContracts = useGetPackingListContracts();
  const getAllStatus = useGetAllStatus();

  useEffect(() => {
    if (getAllStatus.status === FetchStatus.IDLE) {
      // NO ES, ESTO ES DE MOCK
      getAllStatus.call({ tableId: STATUS_PACKING_LIST });
    }
  }, [getAllStatus]);

  useEffect(() => {
    if (packinglistId && getPackingListContracts.status === FetchStatus.IDLE) {
      getPackingListContracts.call(packinglistId);
    }
  }, [getPackingListContracts, packinglistId]);

  return {
    getPackingListContracts,
  };
};

export default useServices;
