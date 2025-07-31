import { useEffect } from 'react';
import { FetchStatus } from '@/constants';
import { useGetAllInventoryTypes } from '@/clients';

const useServices = () => {
  const getAllInventoryTypes = useGetAllInventoryTypes();

  useEffect(() => {
    if (getAllInventoryTypes.status === FetchStatus.IDLE) {
      getAllInventoryTypes.call();
    }
  }, [getAllInventoryTypes]);

  return {
    getAllInventoryTypes,
  };
};

export default useServices;
