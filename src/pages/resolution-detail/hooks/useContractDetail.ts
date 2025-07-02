import { useEffect } from 'react';
import { FetchStatus } from '@/constants';
import useGetAllResolutionDetails from '@/clients/get-detail-resolution';

const useContractDetail = (contractId: number | null) => {
  const getDetailContract = useGetAllResolutionDetails();

  useEffect(() => {
    if (!contractId) return;

    if (getDetailContract.status === FetchStatus.IDLE) {
      getDetailContract.call({ contractId });
    }
  }, [contractId, getDetailContract]);

  return { getDetailContract };
};

export default useContractDetail;
